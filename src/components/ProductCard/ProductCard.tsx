import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Star, ShoppingCart } from 'lucide-react';
import { addToCart } from '../../store/cartSlice';
import './ProductCard.scss';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();
  
  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,        // ✅ Added
      description: product.description // ✅ Added
    }));
    
    // Show feedback
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };
  
  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card__image-container">
        <img src={product.image || "https://via.placeholder.com/300"} alt={product.name} />

        {isHovered && (
          <div className="product-card__badge">
            <Star style={{ width: '1.5rem', height: '1.5rem', color: '#d946ef', fill: '#d946ef' }} />
          </div>
        )}
      </div>
      
      <div className="product-card__content">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        
        <div className="product-card__rating">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              style={{ 
                width: '1rem', 
                height: '1rem',
                color: i < product.rating ? '#d946ef' : '#d1d5db',
                fill: i < product.rating ? '#d946ef' : 'none'
              }}
            />
          ))}
          <span>({product.rating}.0)</span>
        </div>
        
        <div className="product-card__footer">
          <span className="product-card__price">${product.price}</span>
          <button 
            onClick={handleAddToCart} 
            className={`product-card__cart-btn ${added ? 'product-card__cart-btn--added' : ''}`}
          >
            {added ? (
              <span style={{ fontSize: '0.875rem' }}>Added!</span>
            ) : (
              <ShoppingCart style={{ width: '1.25rem', height: '1.25rem' }} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};