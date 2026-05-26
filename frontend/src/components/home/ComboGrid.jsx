import React, { useState, useEffect } from 'react';
import { ShoppingBag, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
/* Removed static import for combos */
import './ComboGrid.css';

/**
 * ComboGrid Component
 * 
 * Fetches and displays curated combo packages from the backend API.
 */
const ComboGrid = () => {
  const navigate = useNavigate();

  /* State to store the list of bundles fetched from the database */
  const [combos, setCombos] = useState([]);
  
  /* State to track whether data is still being loaded */
  const [loading, setLoading] = useState(true);
  
  /* State to capture and display any API errors */
  const [error, setError] = useState(null);

  /* Get API URL from environment variables, fallback to localhost for development */
  const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

  /**
   * Data Fetching Effect
   * Runs once when the component mounts to retrieve combo packages.
   */
  useEffect(() => {
    const fetchCombos = async () => {
      try {
        setLoading(true);
        /* Step 1: Send request to the combos endpoint */
        const res = await fetch(`${API_URL}/combos`);
        
        /* Step 2: Check for HTTP errors */
        if (!res.ok) throw new Error('Failed to fetch combos');
        
        /* Step 3: Parse and store the JSON data */
        const data = await res.json();
        setCombos(data);
        
        setLoading(false);
      } catch (err) {
        /* Step 4: Handle network or server errors */
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCombos();
  }, [API_URL]);

  /* Handle Loading State: Displays a simple text placeholder */
  if (loading) return <div className="combos-loading">Loading bundles...</div>;
  
  /* Handle Error State: Returns null to avoid breaking the home page experience if API fails */
  if (error) return null;

  return (
    <section className="combos-section section-padding">
      {/* Section Introduction */}
      <div className="section-header animate-on-scroll">
        <div className="section-title-wrapper">
          <Gift className="section-icon" />
          <h2 className="section-title">Elite Combo Packages</h2>
        </div>
        <p className="section-subtitle">Curated bundles designed for your complete self-care routine.</p>
      </div>

      {/* Grid of Bundle Cards */}
      <div className="combos-grid">
        {combos.map((combo, idx) => (
          <div 
            key={combo.id} 
            className={`combo-card animate-on-scroll delay-${idx % 3}`}
          >
            {/* Visual Header with Image and Tag */}
            <div className="combo-image-wrapper">
              <div className="combo-tag">{combo.tag}</div>
              <img src={combo.image} alt={combo.name} className="combo-img" />
              <div className="combo-overlay">
                <button className="view-button" onClick={() => navigate('/products')}>
                  View Details
                </button>
              </div>
            </div>

            {/* Content Area with Pricing and CTA */}
            <div className="combo-info">
              <h3 className="combo-name">{combo.name}</h3>
              <div className="combo-footer">
                <span className="combo-price">{combo.price}</span>
                <button className="add-btn-mini">
                  <ShoppingBag size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComboGrid;


