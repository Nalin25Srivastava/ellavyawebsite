import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ProductCard.css';

/**
 * ProductCardImage Component
 * 
 * Handles the image display for a product, including an automatic 
 * carousel that cycles through images when the user hovers over the card.
 */
const ProductCardImage = ({ product, isHovered, categoryIcon, className = "" }) => {
  /* Tracks the index of the currently displayed image */
  const [currentIndex, setCurrentIndex] = useState(0);
  
  /* Normalize images to handle both array and single string formats, including empty arrays */
  const images = (product.images && product.images.length > 0) 
    ? product.images 
    : (product.image ? [product.image] : []);
  
  const hasMultipleImages = images.length > 1;

  /**
   * Effect hook to handle the automatic image carousel on hover.
   * Cycles every 2 seconds when hovered; resets to the first image otherwise.
   */
  useEffect(() => {
    let interval;
    if (isHovered && hasMultipleImages) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 2000);
    } else {
      setCurrentIndex(0); // Reset to first image when not hovering
    }
    
    /* Clean up the interval on component unmount or when dependencies change */
    return () => clearInterval(interval);
  }, [isHovered, hasMultipleImages, images.length]);

  /* Manual navigation to the next image */
  const nextImage = (e) => {
    e.stopPropagation(); // Prevent the card's click handler from firing
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  /* Manual navigation to the previous image */
  const prevImage = (e) => {
    e.stopPropagation(); // Prevent the card's click handler from firing
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={`product-image-wrapper ${className}`}>
      <div className="carousel-container">
        {/* Render all images, but only show the active one via CSS classes */}
        {images.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt={`${product.name} ${idx + 1}`} 
            className={`product-image ${idx === currentIndex ? 'active' : ''}`} 
          />
        ))}
        
        {/* Navigation Controls: Visible only if there are multiple images */}
        {hasMultipleImages && (
          <>
            {/* Left and Right arrows */}
            <button className="carousel-btn prev" onClick={prevImage} aria-label="Previous image">
              <ChevronLeft size={20} />
            </button>
            <button className="carousel-btn next" onClick={nextImage} aria-label="Next image">
              <ChevronRight size={20} />
            </button>
            
            {/* Pagination dots */}
            <div className="carousel-indicators">
              {images.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Category icon badge layered over the image */}
      <div className="product-badge">
        {categoryIcon}
      </div>
    </div>
  );
};

/**
 * ProductCard Component
 * 
 * Displays a summary of a product. 
 * Includes an image carousel on hover and basic product info.
 */
const ProductCard = ({ product, categories, onClick }) => {
  /* State to track local hover for the carousel trigger */
  const [isCardHovered, setIsCardHovered] = useState(false);
  
  /* Look up the full category object to get the icon and name */
  const category = categories.find(c => c.id === product.category);
  
  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      onClick={() => onClick(product)}
    >
      {/* Product Image Section with Carousel Logic */}
      <ProductCardImage 
        product={product} 
        isHovered={isCardHovered} 
        categoryIcon={category?.icon} 
      />

      {/* Product Text Details */}
      <div className="product-info">
        <span className="product-category">
          {category?.name}
        </span>
        <h3 className="product-name">{product.name}</h3>
        
        {/* Footer with price and action button */}
        <div className="product-footer">
          <span className="product-price">{product.price}</span>
          <button className="add-to-cart" onClick={(e) => {
            e.stopPropagation(); // Don't trigger the card's main click twice
            onClick(product);
          }}>Details</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
export { ProductCardImage }; // Also export for reuse in ProductDetailsModal

