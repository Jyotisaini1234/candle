import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Package, Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { RootState } from '../../store/store';
import { fetchOrders, Order, OrderItem } from '../../store/orderSlice';
import { Button } from '../Button/Button';
import './Orders.scss';

interface OrdersProps {
  onBack: () => void;
}

export const Orders: React.FC<OrdersProps> = ({ onBack }) => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  
  const handleFetchOrders = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      dispatch(fetchOrders(email) as any);
      setEmailSubmitted(true);
      // Save email to localStorage for persistence
      localStorage.setItem('userEmail', email);
    }
  };
  
  useEffect(() => {
    // Auto-load orders if email exists in localStorage
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      dispatch(fetchOrders(savedEmail) as any);
      setEmailSubmitted(true);
    }
  }, [dispatch]);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} />;
      case 'pending':
        return <Clock style={{ width: '1.25rem', height: '1.25rem', color: '#f59e0b' }} />;
      case 'failed':
        return <XCircle style={{ width: '1.25rem', height: '1.25rem', color: '#ef4444' }} />;
      default:
        return <Package style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'failed':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };
  
  if (!emailSubmitted) {
    return (
      <div className="orders-page">
        <div className="orders-page__container">
          <Button variant="secondary" onClick={onBack} >
            <ArrowLeft style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
            Back to Home
          </Button>
          
          <div className="orders-page__email-form">
            <Package style={{ width: '3rem', height: '3rem', color: '#d946ef', marginBottom: '1rem' }} />
            <h1 className="orders-page__title">View Your Orders</h1>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              Enter your email to view your order history
            </p>
            
            <form onSubmit={handleFetchOrders} style={{ width: '100%', maxWidth: '400px' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  marginBottom: '1rem'
                }}
              />
              <Button variant="primary">
                View Orders
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-page__container">
          <div className="orders-page__loading">Loading orders...</div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="orders-page">
        <div className="orders-page__container">
          <div className="orders-page__error">
            <p>Error: {error}</p>
            <Button variant="primary" onClick={() => setEmailSubmitted(false)}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="orders-page">
      <div className="orders-page__container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 className="orders-page__title">My Orders</h1>
          <Button variant="secondary" onClick={onBack}>
            <ArrowLeft style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
            Back to Home
          </Button>
        </div>
        
        {orders.length === 0 ? (
          <div className="orders-page__empty">
            <Package style={{ width: '4rem', height: '4rem', color: '#d1d5db', marginBottom: '1rem' }} />
            <p className="orders-page__empty-text">No orders found</p>
            <Button variant="primary" onClick={onBack}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order: Order) => (
              <div key={order.id} className="order-card">
                <div className="order-card__header">
                  <div className="order-card__info">
                    <h3 className="order-card__number">Order #{order.orderNumber}</h3>
                    <p className="order-card__date">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  <div className="order-card__status">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {getStatusIcon(order.paymentStatus)}
                      <span style={{ color: getStatusColor(order.paymentStatus), fontWeight: 600 }}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </span>
                    </div>
                    <div style={{ 
                      padding: '0.25rem 0.75rem', 
                      background: '#f3f4f6', 
                      borderRadius: '999px',
                      fontSize: '0.875rem',
                      marginTop: '0.5rem'
                    }}>
                      {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                    </div>
                  </div>
                </div>
                
                <div className="order-card__items">
                  {order.items.map((item: OrderItem, idx: React.Key) => (
                    <div key={idx} className="order-card__item">
                      <img 
                        src={item.image || "https://via.placeholder.com/60"} 
                        alt={item.name}
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>{item.name}</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          Qty: {item.quantity} × ₹{item.price}
                        </div>
                      </div>
                      <div style={{ fontWeight: 600 }}>
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="order-card__footer">
                  <div className="order-card__address">
                    <strong>Shipping Address:</strong>
                    <p>{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                  
                  <div className="order-card__total">
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      Total Amount
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#d946ef' }}>
                      ₹{order.total.toFixed(2)}
                    </div>
                    {order.paymentId && (
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                        Payment ID: {order.paymentId}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};