import express from 'express';
import jwt from 'jsonwebtoken';
import Customer from '../models/Customer.js';
import Admin from '../models/Admin.js';

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

export default router;
