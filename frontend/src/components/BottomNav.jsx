import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './BottomNav.css';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartQuantity } = useCart();
  const [userInfo, setUserInfo] = React.useState(null);

  React.useEffect(() => {
    const data = localStorage.getItem('userInfo');
    if (data) {
      setUserInfo(JSON.parse(data));
    } else {
      setUserInfo(null);
    }
  }, [location]);

  const handleProfileClick = (e, path) => {
    if (path === '/login' && userInfo) {
      e.preventDefault();
      const confirmLogout = window.confirm(`Logged in as ${userInfo.name}. Do you want to logout?`);
      if (confirmLogout) {
        localStorage.removeItem('userInfo');
        setUserInfo(null);
        navigate('/');
      }
    }
  };

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
          onClick={(e) => handleProfileClick(e, item.path)}
          className={`bottom-nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <div className="bottom-nav-icon">
            {item.icon}
            {item.name === 'Cart' && cartQuantity > 0 && (
              <span className="bottom-nav-badge">{cartQuantity}</span>
            )}
          </div>
          <span className="bottom-nav-label">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNav;
