import express from 'express';
import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';
import Admin from '../models/Admin.js';
import sendEmail from '../utils/sendEmail.js';

const router = express.Router();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password, role, adminToken } = req.body;

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

    const user = await Model.create({
      name,
      email,
      password,
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
      // If admin, initiate OTP flow instead of immediately returning token
      if (role === 'admin') {
        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Set expiry to 10 minutes from now
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
        
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();
        
        // Send email
        const message = `Your Admin Login OTP is: ${otp}. It is valid for 10 minutes.`;
        try {
          await sendEmail({
            email: user.email,
            subject: 'Ellavya Admin Auth - Login OTP',
            message,
          });
          
          return res.json({
            requiresOtp: true,
            email: user.email,
            message: 'OTP sent to your email.'
          });
        } catch (error) {
          console.error(error);
          user.otp = undefined;
          user.otpExpiry = undefined;
          await user.save();
          return res.status(500).json({ message: 'Error sending OTP email' });
        }
      }

      // Normal customer login
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: role || 'customer',
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP for Admin login
// @access  Public
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid user' });
    }

    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(401).json({ message: 'Invalid or expired OTP' });
    }

    // OTP is valid, clear it
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Issue JWT
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: 'admin',
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
