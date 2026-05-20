import mongoose from 'mongoose';

/**
 * Combo Schema
 * Represents bundled product sets shown on the home page.
 */
const ComboSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Main combo ID
  name: { type: String, required: true },            // Bundle name
  image: { type: String, required: true },           // Bundle featured image
  price: { type: String, required: true },           // Bundle price
  tag: { type: String }                              // UI tag (e.g., 'Best Seller')
}, { timestamps: true });

const Combo = mongoose.model('Combo', ComboSchema);
export default Combo;
