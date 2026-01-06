import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ShoppingCart, Menu, X, Package } from 'lucide-react';
import { RootState } from '../../store/store';
import './Header.scss';

interface HeaderProps {
  onCartClick: () => void;
  onLogoClick: () => void;
  onOrdersClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick, onLogoClick, onOrdersClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { items } = useSelector((state: RootState) => state.cart);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <div className="header__logo" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
          <img src="../../logo_circle.png" alt="logo" style={{ width:'3rem' }}/>
          <span className="header__logo-text">JyotiFlame</span>
        </div>
        
        <nav className="header__nav">
          {['Home', 'Shop', 'About', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="header__link">
              {item}
            </a>
          ))}
        </nav>
        
        <div className="header__actions">
          <button className="header__cart" onClick={onOrdersClick} title="My Orders">
            <Package style={{ width: '1.5rem', height: '1.5rem', color: '#1f2937' }} />
          </button>
          
          <button className="header__cart" onClick={onCartClick}>
            <ShoppingCart style={{ width: '1.5rem', height: '1.5rem', color: '#1f2937' }} />
            {cartCount > 0 && (
              <span className="header__cart-badge">{cartCount}</span>
            )}
          </button>
          
          <button onClick={() => setMenuOpen(!menuOpen)} className="header__menu-toggle">
            {menuOpen ? 
              <X style={{ width: '1.5rem', height: '1.5rem' }} /> : 
              <Menu style={{ width: '1.5rem', height: '1.5rem' }} />
            }
          </button>
        </div>
      </div>
    </header>
  );
};