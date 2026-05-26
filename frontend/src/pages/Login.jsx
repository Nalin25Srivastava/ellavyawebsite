import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [adminToken, setAdminToken] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    try {
      if (step === 1) {
        const res = await fetch(`${API_URL}/auth/login`, {
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

        if (data.requiresOtp) {
          setStep(2);
          alert(data.message);
        } else {
          // Normal customer login
          localStorage.setItem('userInfo', JSON.stringify(data));
          navigate('/');
        }
      } else if (step === 2) {
        const res = await fetch(`${API_URL}/auth/verify-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, otp }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Invalid OTP');
        }

        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/');
      }
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

        {step === 1 ? (
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
        ) : (
          <form className="auth-form" onSubmit={submitHandler}>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              We have sent a 6-digit OTP to <b>{email}</b>.
            </p>
            <div className="form-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Log In'}
            </button>
            <button 
              type="button" 
              className="auth-btn" 
              style={{ background: 'transparent', color: '#666', marginTop: '0' }}
              onClick={() => setStep(1)}
            >
              Back
            </button>
          </form>
        )}

        <div className="auth-footer">
          New to Ellavya? <Link to="/signup" className="auth-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
