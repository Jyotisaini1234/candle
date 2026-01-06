import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { RootState } from '../../store/store';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';
import { Button } from '../Button/Button';
import './Cart.scss';

interface CartProps {
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export const Cart: React.FC<CartProps> = ({ onCheckout, onContinueShopping }) => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  
  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };
  
  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };
  
  const shipping = 5.99;
  const tax = total * 0.1;
  const finalTotal = total + shipping + tax;
  
  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-page__container">
          <h1 className="cart-page__title">Shopping Cart</h1>
          <div className="cart-page__empty">
            <ShoppingCart className="cart-page__empty-icon" />
            <p className="cart-page__empty-text">Your cart is empty</p>
            <Button variant="primary" onClick={onContinueShopping}>
              <ArrowLeft style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-page">
      <div className="cart-page__container">
        <h1 className="cart-page__title">Shopping Cart ({items.length} items)</h1>
        
        <div className="cart-page__content">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item__image">
                  <img 
                    src={item.image || "https://via.placeholder.com/100"} 
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
                
                <div className="cart-item__details">
                  <h3 className="cart-item__name">{item.name}</h3>
                  <p className="cart-item__description" style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    {item.description}
                  </p>
                  <p className="cart-item__price">${item.price.toFixed(2)}</p>
                </div>
                
                <div className="cart-item__actions">
                  <div className="cart-item__quantity">
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                      <Minus style={{ width: '1rem', height: '1rem' }} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                      <Plus style={{ width: '1rem', height: '1rem' }} />
                    </button>
                  </div>
                  
                  <button className="cart-item__remove" onClick={() => handleRemove(item.id)}>
                    <Trash2 style={{ width: '1.25rem', height: '1.25rem' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3 className="cart-summary__title">Order Summary</h3>
            
            <div className="cart-summary__row">
              <span className="cart-summary__label">Subtotal</span>
              <span className="cart-summary__value">${total.toFixed(2)}</span>
            </div>
            
            <div className="cart-summary__row">
              <span className="cart-summary__label">Shipping</span>
              <span className="cart-summary__value">${shipping.toFixed(2)}</span>
            </div>
            
            <div className="cart-summary__row">
              <span className="cart-summary__label">Tax (10%)</span>
              <span className="cart-summary__value">${tax.toFixed(2)}</span>
            </div>
            
            <div className="cart-summary__row cart-summary__row--total">
              <span className="cart-summary__label">Total</span>
              <span className="cart-summary__value">${finalTotal.toFixed(2)}</span>
            </div>
            
            <Button variant="primary" className="cart-summary__button" onClick={onCheckout}>
              Proceed to Checkout <ArrowRight style={{ width: '1.25rem', height: '1.25rem', marginLeft: '0.5rem' }} />
            </Button>
            
            <Button variant="secondary" className="cart-continue"  onClick={onContinueShopping}>
              <ArrowLeft style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};