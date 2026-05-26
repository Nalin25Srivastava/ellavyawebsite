import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartQuantity } = useCart();

  // Helper function to parse price string (e.g. "₹299") to number (299)
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    // Remove all non-numeric characters except for periods
    const numericStr = priceStr.replace(/[^0-9.]/g, '');
    return parseFloat(numericStr) || 0;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parsePrice(item.price) * item.cartQuantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 0 ? (subtotal > 999 ? 0 : 50) : 0;
  const total = subtotal + shipping;

  // Format currency
  const formatPrice = (amount) => `₹${amount.toFixed(2)}`;

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-container">
        <div className="cart-empty-content">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty!</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="continue-shopping-btn">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <Link to="/products" className="back-link">
            <ArrowLeft size={20} /> Continue Shopping
          </Link>
          <h1>Shopping Cart ({cartQuantity} items)</h1>
        </div>

        <div className="cart-content">
          <div className="cart-items-section">
            <div className="cart-items-header">
              <span>Product</span>
              <span>Quantity</span>
              <span>Price</span>
            </div>
            
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-product">
                    <img 
                      src={item.image || (item.images && item.images[0])} 
                      alt={item.name} 
                      className="item-image" 
                    />
                    <div className="item-details">
                      <span className="item-category">{item.category}</span>
                      <h3 className="item-name">{item.name}</h3>
                      <button 
                        className="item-remove-btn" 
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="item-quantity">
                    <div className="quantity-controls">
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-value">{item.cartQuantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="item-price">
                    {formatPrice(parsePrice(item.price) * item.cartQuantity)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-actions-bottom">
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>

          <div className="cart-summary-section">
            <div className="summary-card">
              <h2>Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping Estimate</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              
              <button className="checkout-btn" onClick={() => alert('Checkout flow not implemented yet!')}>
                Proceed to Checkout
              </button>
              
              <div className="shipping-notice">
                {subtotal > 999 
                  ? '✨ You qualify for free shipping!' 
                  : `Add ${formatPrice(1000 - subtotal)} more for free shipping`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
