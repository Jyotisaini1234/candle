import React, { useState } from 'react';
import { Flame, User, Lock } from 'lucide-react';
import './Login.scss';

interface LoginProps {
  onSwitchToSignup: () => void;
  onLoginSuccess: () => void;
}

interface LoginFormData {
  identifier: string;
  password: string;
}

export const Login: React.FC<LoginProps> = ({ onSwitchToSignup, onLoginSuccess }) => {
  const [formData, setFormData] = useState<LoginFormData>({ identifier: '', password: '' });
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const validUser = {
      email: 'jyoti@example.com',
      username: 'jyoti saini',
      phone: '1234567890',
      password: 'jyotisaini9871'
    };

    const isValidIdentifier = 
      formData.identifier === validUser.email ||
      formData.identifier === validUser.username ||
      formData.identifier === validUser.phone;

    if (isValidIdentifier && formData.password === validUser.password) {
      onLoginSuccess();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            {/* <Flame className="icon" /> */}
            <img src="../logo_circle.png" alt="logo" width={100} />
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Login to your account</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">
              Email / Username / Phone
            </label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input
                type="text"
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                className="form-input"
                placeholder="Enter email, username or phone"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <div className="auth-footer">
          <p className="footer-text">
            Don't have an account?{' '}
            <button onClick={onSwitchToSignup} className="footer-link" type="button">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};