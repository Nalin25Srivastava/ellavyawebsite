import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import rcsHero from '../assets/rcs-hero.png';

/**
 * About Component - RCS Placements
 * 
 * A professional corporate profile for RCS Placements and Consultancy,
 * highlighting their expertise in HR services and recruitment.
 */
const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section 
        className="about-hero" 
        style={{ backgroundImage: `url(${rcsHero})` }}
      >
        <div className="hero-content">
          <h1>RCS Placements</h1>
          <p>Empowering Organizations Through Strategic Talent Acquisition & HR Excellence.</p>
        </div>
      </section>

      {/* Corporate Overview */}
      <section className="about-section">
        <div className="story-grid">
          <div className="story-text">
            <div className="section-title" style={{ textAlign: 'left' }}>
              <h2>Strategic Excellence</h2>
              <div className="divider" style={{ margin: '0' }}></div>
            </div>
            <p>
              Established in 2011, <strong>RCS Placement Consultancy</strong> has emerged as a premier 
              Human Resource Management company dedicated to bridging the gap between 
              resourceful talent and industry leaders.
            </p>
            <p>
              Based in Kota, India, we specialize in identifying high-caliber professionals 
              who possess the creativity, commitment, and energy required to drive 
              organizational growth in an ever-evolving global market.
            </p>
            <h3>Our Mission</h3>
            <p>
              To serve the unique needs of corporate organizations by providing the most 
              competent and resourceful candidates, ensuring a seamless integration of 
              talent into the corporate fabric.
            </p>
          </div>
          <div className="story-image">
            <img 
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1000&auto=format&fit=crop" 
              alt="Professional meeting" 
            />
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="stats-banner">
        <div className="stat-item">
          <span className="stat-number">12+</span>
          <span className="stat-label">Years of Experience</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">500+</span>
          <span className="stat-label">Corporate Clients</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">10k+</span>
          <span className="stat-label">Placements Secured</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">98%</span>
          <span className="stat-label">Retention Rate</span>
        </div>
      </div>

      {/* Core Services */}
      <section className="about-section" style={{ backgroundColor: '#fdfdfd' }}>
        <div className="section-title">
          <h2>Our Core Expertise</h2>
          <div className="divider"></div>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">👤</div>
            <h4>Permanent Recruitment</h4>
            <p>Comprehensive executive search and placement services for long-term organizational stability.</p>
          </div>
          <div className="feature-card">
            <div className="icon">⏱️</div>
            <h4>Contract Staffing</h4>
            <p>Flexible workforce solutions to meet project-based demands and temporary talent gaps.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🎓</div>
            <h4>Campus Recruitment</h4>
            <p>Identifying and nurturing fresh talent from premier educational institutions for entry-level excellence.</p>
          </div>
          <div className="feature-card">
            <div className="icon">⚙️</div>
            <h4>IT & Marketing Services</h4>
            <p>Specialized recruitment and consultancy for the high-growth technology and digital marketing sectors.</p>
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
            "To be the most preferred global HR partner by delivering value-added services 
            and creating a legacy of trust, reliability, and human-centric solutions 
            in the recruitment landscape."
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Ready to Scale Your Workforce?</h2>
        <p>Partner with RCS Placements for customized recruitment solutions tailored to your industry needs.</p>
        <Link to="/contact" className="cta-btn">Contact Our Consultants</Link>
      </section>
    </div>
  );
};

export default About;
