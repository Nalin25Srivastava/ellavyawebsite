import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import ComboGrid from '../components/home/ComboGrid';
import Philosophy from '../components/home/Philosophy';
import './Home.css';

const Home = () => {
  useEffect(() => {
    // Reveal animation on scroll
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-container">
      <Hero />
      <ComboGrid />
      <Philosophy />
    </div>
  );
};

export default Home;
