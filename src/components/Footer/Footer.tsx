import React from 'react';
import { Flame } from 'lucide-react';
import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <img src="../../logo_circle.png" alt="logo"  style={{ width:'2.5rem' }}/>
          <span className="footer__logo-text">JyotiFlame</span>
        </div>
        <p className="footer__description">Handcrafted luxury candles for your home</p>
        <p className="footer__copyright">&copy; 2025 JyotiFlame. All rights reserved.</p>
      </div>
    </footer>
  );
};