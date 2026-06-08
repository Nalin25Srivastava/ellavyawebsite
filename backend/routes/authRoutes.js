import express from 'express';
import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';
import Admin from '../models/Admin.js';
import Otp from '../models/Otp.js';
import sendEmail from '../utils/sendEmail.js';

const router = express.Router();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/send-otp
// @desc    Send OTP to email
// @access  Public
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.create({ email, otp });
    
    const message = `Your Verification OTP is: ${otp}. It is valid for 5 minutes.`;
    await sendEmail({
      email,
      subject: 'Ellavya - Verification OTP',
      message,
    });
    
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending OTP email' });
  }
});

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password, role, adminToken, otp } = req.body;

  try {
    let Model;
    if (role === 'admin') {
      if (adminToken !== 'neershalin') {
        return res.status(401).json({ message: 'Invalid Admin Token. Access denied.' });
      }
      Model = Admin;
    } else {
      Model = Customer;
    }

    const userExists = await Model.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Verify OTP
    const validOtp = await Otp.findOne({ email, otp });
    if (!validOtp) {
      return res.status(401).json({ message: 'Invalid or expired OTP' });
    }

    // Clear OTP
    await Otp.deleteMany({ email });

    const user = await Model.create({
      name,
      email,
      password,
      plainPassword: password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: role || 'customer',
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Auth user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password, role, adminToken } = req.body;

  try {
    let Model;
    if (role === 'admin') {
      if (adminToken !== 'neershalin') {
        return res.status(401).json({ message: 'Invalid Admin Token. Access denied.' });
      }
      Model = Admin;
    } else {
      Model = Customer;
    }

    const user = await Model.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Initiate OTP flow for everyone
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      await Otp.create({ email: user.email, otp });
      
      const message = `Your Login OTP is: ${otp}. It is valid for 5 minutes.`;
      try {
        await sendEmail({
          email: user.email,
          subject: 'Ellavya - Login OTP',
          message,
        });
        
        return res.json({
          requiresOtp: true,
          email: user.email,
          message: 'OTP sent to your email.'
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error sending OTP email' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP for Login
// @access  Public
router.post('/verify-otp', async (req, res) => {
  const { email, otp, role } = req.body;

  try {
    const validOtp = await Otp.findOne({ email, otp });

    if (!validOtp) {
      return res.status(401).json({ message: 'Invalid or expired OTP' });
    }

    // OTP is valid, clear it
    await Otp.deleteMany({ email });

    let Model = role === 'admin' ? Admin : Customer;
    const user = await Model.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid user' });
    }

    // Issue JWT
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: role || 'customer',
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
