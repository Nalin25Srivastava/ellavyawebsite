import React from 'react';
import { Sparkles, Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

/**
 * Hero Component
 * 
 * The main landing section of the home page.
 * Includes a call to action, brand highlights, and featured imagery.
 */
const Hero = () => {
  /* Navigation hook to programmatically move between routes */
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      {/* Left Column: Text Content and Call to Action */}
      <div className="hero-content animate-on-scroll">
        {/* Brand Badge - Highlights core values */}
        <div className="hero-badge">
          <Sparkles size={25} />
          <span style={{fontSize:"1.3rem"}}>Pure • Natural • Artisan</span>
        </div>

        {/* Main Heading */}
        <h1 className="hero-title">
          The Essence of <span className="highlight">Pure Nature</span>
        </h1>

        {/* Subtitle - Explains the brand's mission */}
        <p className="hero-subtitle">
          Experience the harmony of traditional wisdom and modern luxury. 
          Handcrafted care for your mind, body, and soul.
        </p>

        {/* Call to Action Buttons */}
        <div className="hero-cta">
          {/* Primary CTA: Directly leads to the product catalog */}
          <button className="cta-button primary" onClick={() => navigate('/products')}>
            Shop Collection <ChevronRight size={20} />
          </button>

          {/* Secondary CTA: Links to the story/about section */}
          <button className="cta-button secondary" onClick={() => navigate('/about')}>
            Our Story
          </button>
        </div>
      </div>

      {/* Right Column: Visual Elements */}
      <div className="hero-visual animate-on-scroll">
        {/* Floating Highlight Card */}
        <div className="hero-card-floating">
          <Star className="star-icon" fill="#aa3bff" />
          <span>Top Rated Skincare</span>
        </div>

        {/* Main Hero Image */}
        <img src="/images/combos/combo1.1.png" alt="Featured Combo" className="hero-image" />
      </div>
    </section>
  );
};

export default Hero;

