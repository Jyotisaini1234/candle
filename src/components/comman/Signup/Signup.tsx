import React, { useState } from 'react';
import { Flame, Mail, Lock, User, Phone, MapPin, Hash } from 'lucide-react';
import './Signup.scss';

interface SignupProps {
  onSwitchToLogin: () => void;
  onSignupSuccess: () => void;
}

interface SignupFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  pincode: string;
  password: string;
}

export const Signup: React.FC<SignupProps> = ({ onSwitchToLogin, onSignupSuccess }) => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode: '',
    password: ''
  });
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (formData.phone.length !== 10 || !/^\d+$/.test(formData.phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    if (formData.pincode.length !== 6 || !/^\d+$/.test(formData.pincode)) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    alert('Signup successful! Please login with your credentials.');
    onSignupSuccess();
  };

  return (
    <div className="auth-container">
      <div className="auth-card signup-card">
        <div className="auth-header">
          <div className="auth-icon">
            {/* <Flame className="icon" /> */}
            <img src="../logo_circle.png" alt="logo" width={100} />
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Sign up to get started</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="form-input" placeholder="Enter your full name" required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email *</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="form-input" placeholder="Enter your email" required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Phone *</label>
            <div className="input-wrapper">
              <Phone className="input-icon" />
              <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="form-input"  placeholder="Enter 10-digit phone number"  required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Address *</label>
            <div className="input-wrapper">
              <MapPin className="input-icon" />
              <input type="text" value={formData.address}onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="form-input"  placeholder="Enter your address"required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Pincode *</label>
            <div className="input-wrapper">
              <Hash className="input-icon" />
              <input  type="text" value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} className="form-input" placeholder="Enter 6-digit pincode" required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password *</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="form-input" placeholder="Create a password" required />
            </div>
          </div>

          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>

        <div className="auth-footer">
          <p className="footer-text">
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="footer-link" type="button">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

