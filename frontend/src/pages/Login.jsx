import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [adminToken, setAdminToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role, adminToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Store token
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (selectedRole) => {
    if (selectedRole === 'admin') {
      const token = window.prompt("Please enter the Admin Token to proceed:");
      if (token === 'neershalin') {
        setAdminToken(token);
        setRole('admin');
      } else {
        window.alert("Invalid Admin Token! Returning to Customer mode.");
        setRole('customer');
        setAdminToken('');
      }
    } else {
      setRole('customer');
      setAdminToken('');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Log in to access your Ellavya account</p>

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={submitHandler}>
          <div className="role-toggle">
            <button 
              type="button" 
              className={`role-btn ${role === 'customer' ? 'active' : ''}`}
              onClick={() => handleRoleChange('customer')}
            >
              Customer
            </button>
            <button 
              type="button" 
              className={`role-btn ${role === 'admin' ? 'active' : ''}`}
              onClick={() => handleRoleChange('admin')}
            >
              Admin
            </button>
          </div>

          {role === 'admin' && (
            <div className="form-group">
              <label htmlFor="adminToken">Admin Token (Verified)</label>
              <input
                type="password"
                id="adminToken"
                value={adminToken}
                readOnly
                disabled
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        <div className="auth-footer">
          New to Ellavya? <Link to="/signup" className="auth-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
