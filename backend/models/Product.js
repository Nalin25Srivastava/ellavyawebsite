import mongoose from 'mongoose';

/**
 * Product Schema
 * Stores all information for an individual retail item.
 */
const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Main product ID
  name: { type: String, required: true },            // Item name
  category: { type: String, required: true },        // Linked category ID
  price: { type: String, required: true },           // Sale price
  mrp: { type: String },                             // Maximum Retail Price
  quantity: { type: String },                        // Physical amount (e.g., '100g')
  stock: { type: Number, default: 0 },               // Available inventory
  benefits: [String],                                // Key selling points
  usage: { type: String },                           // How to use
  instructions: { type: String },                    // Safety or storage info
  images: [String],                                  // Gallery of images
  image: { type: String }                            // Featured image fallback
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
export default Product;
