import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import './Navbar.css';

/**
 * Navbar Component
 * 
 * Provides site-wide navigation, including a mobile-responsive menu,
 * logo, and authentication links.
 */
const Navbar = () => {
  /* State to manage whether the mobile menu (mobile overlay) is open or closed */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* Function to toggle the mobile menu state (open/closed) */
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  /* Function to explicitly close the mobile menu when a link is clicked */
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Site Logo and Home Link */}
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src="/images/logo.jpg" alt="ELLAVYA Logo" className="navbar-logo-img" />
          ELLAVYA
        </Link>

        {/* Mobile Menu Icon (Burger/Cross) visible only on small screens */}
        <div className="menu-icon" onClick={toggleMobileMenu}>
          <span className="menu-icon-text">{isMobileMenuOpen ? '✕' : '☰'}</span>
        </div>

        {/* Navigation Menu Links */}
        <ul className={isMobileMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-links" onClick={closeMobileMenu}>Products</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={closeMobileMenu}>About</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links" onClick={closeMobileMenu}>Contact</Link>
          </li>
          
          {/* Shopping Cart Link with Badge */}
          <li className="nav-item">
            <Link to="/cart" className="nav-links cart-link" onClick={closeMobileMenu}>
              <div className="cart-icon-wrapper">
                <ShoppingCart size={24} />
                <span className="cart-badge">0</span>
              </div>
              <span className="cart-text">Cart</span>
            </Link>
          </li>

          {/* Mobile-Only Authentication Buttons (rendered inside the menu on mobile) */}
          <li className="nav-item-mobileOnly">
            <div className="navbar-auth-mobile">
              <Link to="/login" className="btn-login" onClick={closeMobileMenu}>Log In</Link>
              <Link to="/signup" className="btn-signup" onClick={closeMobileMenu}>Sign Up</Link>
            </div>
          </li>
        </ul>

        {/* Desktop-Only Authentication Buttons */}
        <div className="navbar-auth">
          <Link to="/login" className="btn-login">Log In</Link>
          <Link to="/signup" className="btn-signup">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

