import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

/**
 * Navbar Component
 * 
 * Provides site-wide navigation, including a mobile-responsive menu,
 * logo, and authentication links.
 */
const Navbar = () => {
  const { cartQuantity } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  /* State to manage whether the mobile menu (mobile overlay) is open or closed */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const data = localStorage.getItem('userInfo');
    if (data) {
      setUserInfo(JSON.parse(data));
    } else {
      setUserInfo(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    navigate('/');
  };

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
                <span className="cart-badge">{cartQuantity}</span>
              </div>
              <span className="cart-text">Cart</span>
            </Link>
          </li>

          {/* Mobile-Only Authentication Buttons (rendered inside the menu on mobile) */}
          <li className="nav-item-mobileOnly">
            <div className="navbar-auth-mobile">
              {userInfo ? (
                <button className="btn-logout" onClick={() => { handleLogout(); closeMobileMenu(); }} style={{ background: '#aa3bff', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, width: '100%' }}>Logout ({userInfo.name})</button>
              ) : (
                <>
                  <Link to="/login" className="btn-login" onClick={closeMobileMenu}>Log In</Link>
                  <Link to="/signup" className="btn-signup" onClick={closeMobileMenu}>Sign Up</Link>
                </>
              )}
            </div>
          </li>
        </ul>

        {/* Desktop-Only Authentication Buttons */}
        <div className="navbar-auth">
          {userInfo ? (
            <button className="btn-logout" onClick={handleLogout} style={{ background: '#aa3bff', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Logout ({userInfo.name})</button>
          ) : (
            <>
              <Link to="/login" className="btn-login">Log In</Link>
              <Link to="/signup" className="btn-signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

