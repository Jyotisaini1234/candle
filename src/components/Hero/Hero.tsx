import React from 'react';
import { Flame, ChevronRight } from 'lucide-react';
import { Button } from '../Button/Button';
import './Hero.scss';

export const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <h1 className="hero__title">
          Ignite the Light Within
          <span className="hero__title-gradient">Your Space</span>
          </h1>
          
          <p className="hero__description">
          Hand-poured luxury candles made with pure soy wax and exquisite fragrances—designed
          to elevate your moments and fill your home with calm, warmth, and elegance.
          </p>
          
          <div className="hero__actions">
            <Button variant="primary">
              Shop Now <ChevronRight style={{ width: '1.25rem', height: '1.25rem', marginLeft: '0.5rem' }} />
            </Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
        
        <div className="hero__visual">
          <img src="../../logo_circle.png" alt="logo"  style={{ width:'25rem' ,height:'25rem'}}/>
        </div>
      </div>
    </section>
  );
};