import mongoose from 'mongoose';

/**
 * Category Schema
 * Represents a high-level grouping for products (e.g., 'Herbal Powders').
 */
const CategorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // URL-friendly identifier
  name: { type: String, required: true },            // Display name
  icon: { type: String },                            // Icon or emoji
  description: { type: String }                      // Short summary
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);
export default Category;
