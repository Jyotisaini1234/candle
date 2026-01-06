import React from 'react';
import './Features.scss';

const featuresData = [
  { title: 'Natural Ingredients', description: '100% soy wax & essential oils', icon: '🌿' },
  { title: 'Hand-Poured', description: 'Crafted with love and care', icon: '✨' },
  { title: 'Long Lasting', description: '40+ hours of burn time', icon: '⏰' }
];

export const Features: React.FC = () => {
  return (
    <section className="features">
      <div className="features__container">
        <div className="features__grid">
          {featuresData.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-card__icon">{feature.icon}</div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};