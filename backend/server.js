import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import Combo from './models/Combo.js';

/**
 * Load Environment Variables
 * Initializes configuration from the .env file.
 */
dotenv.config();

/**
 * Database Connection
 * Establishes a connection to the MongoDB database.
 */
connectDB();

const app = express();

/**
 * Middleware Configuration
 * - cors: Enables Cross-Origin Resource Sharing for frontend access.
 * - express.json: Parses incoming JSON request bodies.
 */
app.use(cors());
app.use(express.json());

/**
 * Root API Route
 * Provides a simple status check for the API.
 */
app.get('/', (req, res) => {
  res.send('Ellavya API is running...');
});

/**
 * Category Routes
 * GET /api/categories: Retrieves the list of all product categories.
 */
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Product Routes
 * GET /api/products: Retrieves the complete list of products from the database.
 */
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Combo Routes
 * GET /api/combos: Retrieves curated combo packages for the home page.
 */
app.get('/api/combos', async (req, res) => {
  try {
    const combos = await Combo.find({});
    res.json(combos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Single Product Route
 * GET /api/products/:id: Fetches detailed information for a specific product by its ID.
 */
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Server Initialization
 * Starts the Express server on the configured port locally.
 * In production (Vercel), the app is exported as a serverless function.
 */
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;

