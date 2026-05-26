import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* Component Imports */
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Products from './pages/Products';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';


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
      
      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Main Page Routing Logic */}
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Support and Inquiry Page */}
        <Route path="/contact" element={<Contact />} />

        {/* Product Catalog/Store Page */}
        <Route path="/products" element={<Products />} />

        {/* Cart Page */}
        <Route path="/cart" element={<Cart />} />
        
        {/* About Page */}
        <Route path="/about" element={<About />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </Router>
  );
}

export default App;

