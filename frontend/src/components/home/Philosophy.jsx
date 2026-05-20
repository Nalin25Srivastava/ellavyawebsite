import React from 'react';
import './Philosophy.css';

const Philosophy = () => {
  return (
    <section className="philosophy-section animate-on-scroll">
      <div className="phi-card">
        <h3>Why Choose ELLAVYA?</h3>
        <div className="phi-features">
          <div className="phi-item">
            <div className="phi-icon-box">🌿</div>
            <h4>100% Organic</h4>
            <p>Pure ingredients sourced directly from nature.</p>
          </div>
          <div className="phi-item">
            <div className="phi-icon-box">✨</div>
            <h4>Artisan Made</h4>
            <p>Handcrafted with love and attention to detail.</p>
          </div>
          <div className="phi-item">
            <div className="phi-icon-box">♻️</div>
            <h4>Sustainable</h4>
            <p>Eco-friendly packaging and ethical sourcing.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
