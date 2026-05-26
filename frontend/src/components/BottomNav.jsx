import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import './BottomNav.css';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={24} /> },
    { name: 'Categories', path: '/products', icon: <Search size={24} /> },
    { name: 'Cart', path: '/cart', icon: <ShoppingBag size={24} /> },
    { name: 'Profile', path: '/login', icon: <User size={24} /> },
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`bottom-nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <div className="bottom-nav-icon">{item.icon}</div>
          <span className="bottom-nav-label">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNav;
