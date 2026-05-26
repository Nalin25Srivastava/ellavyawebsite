import mongoose from 'mongoose';
import dotenv from 'dotenv';

/* Load configuration from the environment */
dotenv.config();

// Track the connection state
let isConnected = false;

/**
 * MongoDB Connection Handler
 * Connects the application to the MongoDB instance specified in the .env file.
 * Uses connection caching for Serverless environments (like Vercel) to prevent slow cold-starts.
 */
const connectDB = async () => {
  // If already connected, use the existing connection to save time
  if (isConnected || mongoose.connection.readyState >= 1) {
    console.log('=> Using existing database connection');
    isConnected = true;
    return;
  }

  try {
    /* Attempt to establish connection using Mongoose */
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Fail fast if DB is unreachable
    });
    
    isConnected = !!conn.connections[0].readyState;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    /* Log connection errors and terminate the process if it fails */
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
