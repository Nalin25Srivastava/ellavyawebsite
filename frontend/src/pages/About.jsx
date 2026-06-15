import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

/**
 * About Component - Ellavya Brand
 * 
 * A professional profile for Ellavya,
 * highlighting the brand's commitment to quality and customers.
 */
const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section 
        className="about-hero" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2000&auto=format&fit=crop')` }}
      >
        <div className="hero-content">
          <h1>Ellavya</h1>
          <p>Curating Excellence in Every Product, Elevating Your Everyday Lifestyle.</p>
        </div>
      </section>

      {/* Corporate Overview */}
      <section className="about-section">
        <div className="story-grid">
          <div className="story-text">
            <div className="section-title" style={{ textAlign: 'left' }}>
              <h2>Our Story</h2>
              <div className="divider" style={{ margin: '0' }}></div>
            </div>
            <p>
              Welcome to <strong>Ellavya</strong>, your premier destination for high-quality, thoughtfully curated products. We believe that shopping should be more than just a transaction; it should be an experience of discovering items that add genuine value to your life.
            </p>
            <p>
              At Ellavya, we meticulously source our collections to ensure that every item meets our strict standards for quality, sustainability, and aesthetic appeal. From premium lifestyle goods to specialized herbal products, we are dedicated to bringing the best of the market directly to your doorstep.
            </p>
            <h3>Our Mission</h3>
            <p>
              To empower our customers by providing access to top-tier products, exceptional customer service, and a seamless shopping experience that inspires trust and loyalty.
            </p>
          </div>
          <div className="story-image">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop" 
              alt="Ellavya customer experience" 
            />
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="stats-banner">
        <div className="stat-item">
          <span className="stat-number">10k+</span>
          <span className="stat-label">Happy Customers</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">500+</span>
          <span className="stat-label">Premium Products</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">Quality Assured</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">24/7</span>
          <span className="stat-label">Customer Support</span>
        </div>
      </div>

      {/* Core Values */}
      <section className="about-section" style={{ backgroundColor: '#fdfdfd' }}>
        <div className="section-title">
          <h2>Why Choose Ellavya</h2>
          <div className="divider"></div>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">🌟</div>
            <h4>Premium Quality</h4>
            <p>We never compromise on quality. Every product is carefully vetted to ensure it meets our exacting standards.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🌿</div>
            <h4>Authentic Sourcing</h4>
            <p>We partner with trusted creators and suppliers to bring you genuine, ethically sourced products.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🚚</div>
            <h4>Fast & Secure Delivery</h4>
            <p>Enjoy peace of mind with our reliable shipping partners, ensuring your items arrive safely and on time.</p>
          </div>
          <div className="feature-card">
            <div className="icon">💬</div>
            <h4>Dedicated Support</h4>
            <p>Our customer care team is always ready to assist you, making your shopping journey smooth and enjoyable.</p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="about-section">
        <div className="section-title">
          <h2>Our Vision</h2>
          <div className="divider"></div>
        </div>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem' }}>
          <p>
            "To be the most loved and trusted e-commerce brand, creating a seamless bridge between premium quality products and conscious consumers around the world."
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Ready to Explore?</h2>
        <p>Discover our exclusive collections and experience the Ellavya difference today.</p>
        <Link to="/products" className="cta-btn">Shop Now</Link>
      </section>
    </div>
  );
};

export default About;
