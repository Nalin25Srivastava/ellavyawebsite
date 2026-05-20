import mongoose from 'mongoose';
import dotenv from 'dotenv';

/* Load configuration from the environment */
dotenv.config();

/**
 * MongoDB Connection Handler
 * Connects the application to the MongoDB instance specified in the .env file.
 */
const connectDB = async () => {
  try {
    /* Attempt to establish connection using Mongoose */
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    /* Log connection errors and terminate the process if it fails */
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

