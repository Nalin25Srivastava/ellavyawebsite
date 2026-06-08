import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

    try {
      if (step === 1) {
        const res = await fetch(`${API_URL}/auth/send-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Error sending OTP');
        }

        setStep(2);
        alert('Verification OTP sent to your email.');
      } else if (step === 2) {
        const res = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password, role, adminToken, otp }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Something went wrong');
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
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join Ellavya today</p>

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
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Sign Up'}
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
              {loading ? 'Creating Account...' : 'Verify & Sign Up'}
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
          Already have an account? <Link to="/login" className="auth-link">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
