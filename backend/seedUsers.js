import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Customer from './models/Customer.js';
import Admin from './models/Admin.js';

dotenv.config();

const seedUsers = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Clear existing users
    await Customer.deleteMany();
    await Admin.deleteMany();
    console.log('Cleared existing users.');

    // Create a test customer
    const customer = await Customer.create({
      name: 'Test Customer',
      email: 'customer@ellavya.com',
      password: 'password123' // Will be hashed by pre-save hook
    });
    console.log('Test Customer added:', customer.email);

    // Create a test admin
    const admin = await Admin.create({
      name: 'Test Admin',
      email: 'admin@ellavya.com',
      password: 'adminpassword123' // Will be hashed by pre-save hook
    });
    console.log('Test Admin added:', admin.email);

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedUsers();
