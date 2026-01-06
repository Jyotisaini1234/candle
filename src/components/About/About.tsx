import React from 'react';
import { Flame, Heart, Sparkles, Award } from 'lucide-react';
import './About.scss';

export const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="about__container">
        <div className="about__content">
          <div className="about__text">
            <h2 className="about__title">
              About <span className="about__title-highlight">JyotiFlame</span>
            </h2>
            <p className="about__description">
              Welcome to JyotiFlame, where we craft premium handmade candles that illuminate your space 
              with warmth and elegance. Each candle is carefully hand-poured with love, using 100% natural 
              soy wax and the finest essential oils.
            </p>
            <p className="about__description">
            Founded by Jyoti, JyotiFlame began as a passion for creating calm and warmth through handcrafted candles. Each creation reflects care, creativity, and a commitment to quality.
            Our passion is creating moments of tranquility and joy through the gentle glow of candlelight. 
            Every product tells a story of craftsmanship, quality, and dedication to bringing light into your life.
            </p>
            
            <div className="about__features">
              <div className="about__feature">
                <div className="about__feature-icon">
                  <Heart style={{ width: '1.5rem', height: '1.5rem', color: '#d946ef' }} />
                </div>
                <div>
                  <h3 className="about__feature-title">Handcrafted with Love</h3>
                  <p className="about__feature-text">Every candle is made by hand with attention to detail</p>
                </div>
              </div>
              
              <div className="about__feature">
                <div className="about__feature-icon">
                  <Sparkles style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
                </div>
                <div>
                  <h3 className="about__feature-title">Premium Quality</h3>
                  <p className="about__feature-text">100% natural soy wax and essential oils</p>
                </div>
              </div>
              
              <div className="about__feature">
                <div className="about__feature-icon">
                  <Award style={{ width: '1.5rem', height: '1.5rem', color: '#f59e0b' }} />
                </div>
                <div>
                  <h3 className="about__feature-title">Sustainable Choice</h3>
                  <p className="about__feature-text">Eco-friendly materials and packaging</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about__image">
            <div className="about__image-wrapper">
            <img src="https://i.pinimg.com/1200x/2c/f1/3e/2cf13edb322975b1b58cea6915fb6a34.jpg" alt="candle" style={{width:'20rem', height:'20rem'}}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};