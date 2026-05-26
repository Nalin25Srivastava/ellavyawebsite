import React from 'react';
import { X } from 'lucide-react';
import { ProductCardImage } from './ProductCard';
import { useCart } from '../../context/CartContext';
import './ProductDetailsModal.css';

/**
 * ProductDetailsModal Component
 * 
 * An overlay modal that displays comprehensive information about a specific product.
 * Triggered when a user clicks a product card for more details.
 */
const ProductDetailsModal = ({ product, isOpen, onClose, categories }) => {
  const { addToCart } = useCart();
  
  /* Guard clause: Don't render anything if the modal isn't open or no product is selected */
  if (!isOpen || !product) return null;

  /* Look up the full category object for the current product */
  const category = categories.find(c => c.id === product.category);

  const handleAddToCart = () => {
    addToCart(product);
    alert(`Added ${product.name} to cart!`);
    onClose(); // Optional: close modal after adding
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* StopPropagation prevents clicking inside the modal from closing it */}
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Close Button at the top right */}
        <button className="close-modal" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-body">
          {/* Left Side: Product Image Carousel */}
          <div className="modal-image-section">
            {/* 
                Reuse the ProductCardImage component. 
                Setting isHovered={true} ensures the auto-carousel cycles in the modal.
            */}
            <ProductCardImage 
                product={product} 
                isHovered={true} 
                categoryIcon={category?.icon} 
                className="modal-inner-image"
            />
          </div>
          
          {/* Right Side: Product Information */}
          <div className="modal-info-section">
            <div className="modal-header">
              <span className="modal-category">{category?.icon} {category?.name}</span>
              <h2 className="modal-title">{product.name}</h2>
              
              {/* Pricing Information Row */}
              <div className="modal-price-row">
                <span className="modal-price">{product.price}</span>
                {product.mrp && <span className="modal-mrp">{product.mrp}</span>}
                <span className="modal-quantity">{product.quantity}</span>
              </div>
            </div>

            {/* Key Product Statistics (Stock, Weight) */}
            <div className="modal-stats-grid">
              <div className="stat-item">
                <span className="stat-label">Stock Status</span>
                {/* Visual indicator for low stock */}
                <span className={`stat-value ${product.stock < 10 ? 'low' : ''}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Net Weight</span>
                <span className="stat-value">{product.quantity}</span>
              </div>
            </div>

            {/* Detailed Content Sections (Benefits, Usage, Instructions) */}
            <div className="modal-details-sections">
              {/* Key Benefits List - only shown if product has benefits defined */}
              {product.benefits && (
                <div className="detail-section">
                  <h3>Key Benefits</h3>
                  <ul className="benefits-list">
                    {product.benefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Usage Guide */}
              {product.usage && (
                <div className="detail-section">
                  <h3>How to Use</h3>
                  <p>{product.usage}</p>
                </div>
              )}

              {/* Special Care Instructions */}
              {product.instructions && (
                <div className="detail-section">
                  <h3>Special Instructions</h3>
                  <p>{product.instructions}</p>
                </div>
              )}
            </div>

            {/* Action Buttons: Footer of the info section */}
            <div className="modal-footer-btns">
              <button className="buy-now-btn" onClick={() => {
                addToCart(product);
                // In future, redirect to checkout
                alert(`Proceeding to checkout with ${product.name}`);
              }}>Buy Now</button>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;

