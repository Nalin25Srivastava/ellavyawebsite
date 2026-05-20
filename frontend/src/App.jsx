import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* Component Imports */
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Products from './pages/Products';
import About from './pages/About';


/* Global Styles */
import './App.css';

/**
 * Main Application Component
 * 
 * Handles the application routing and provides 
 * a consistent layout with the Navbar across all pages.
 */
function App() {
  return (
    <Router>
      {/* Universal Navigation Header */}
      <Navbar />

      {/* Main Page Routing Logic */}
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Support and Inquiry Page */}
        <Route path="/contact" element={<Contact />} />

        {/* Product Catalog/Store Page */}
        <Route path="/products" element={<Products />} />

        {/* Temporary placeholders for Cart and About - redirecting to Home for now */}
        <Route path="/cart" element={<Home />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </Router>
  );
}

export default App;

