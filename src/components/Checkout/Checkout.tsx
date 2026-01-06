import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MapPin, CreditCard, CheckCircle } from 'lucide-react';
import { RootState } from '../../store/store';
import { clearCart } from '../../store/cartSlice';
import { createOrder, updateOrderPayment } from '../../store/orderSlice';
import { Button } from '../Button/Button';
import './Checkout.scss';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CheckoutProps {
  onOrderComplete: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onOrderComplete }) => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { loading } = useSelector((state: RootState) => state.orders);
  
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  
  const [processingPayment, setProcessingPayment] = useState(false);
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };
  
  const shipping = 5.99;
  const tax = total * 0.1;
  const finalTotal = total + shipping + tax;
  
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!shippingAddress.fullName || !shippingAddress.email || !shippingAddress.phone) {
      alert('Please fill all required fields');
      return;
    }
    
    setProcessingPayment(true);
    
    try {
      // Create order in backend
      const orderData = {
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        shippingAddress,
        subtotal: total,
        shipping,
        tax,
        total: finalTotal,
        paymentStatus: 'pending' as const,
        orderStatus: 'processing' as const,
      };
      
      const resultAction = await dispatch(createOrder(orderData) as any);
      
      if (createOrder.fulfilled.match(resultAction)) {
  const order = resultAction.payload;

  // 🔥 DUMMY PAYMENT FLOW
  await dispatch(updateOrderPayment({
    orderId: order.id,
    paymentId: 'DUMMY_PAYMENT_' + Date.now(),
    status: 'completed'   // or 'pending'
  }) as any);

  dispatch(clearCart());
  setProcessingPayment(false);
  alert('Order placed successfully (Dummy Payment)');
  onOrderComplete();
}
  else {
        throw new Error('Failed to create order');
      }
      
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to process order. Please try again.');
      setProcessingPayment(false);
    }
  };
  
  const initiateRazorpayPayment = async (order: any) => {
    const res = await loadRazorpayScript();
    
    if (!res) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      setProcessingPayment(false);
      return;
    }
    
    // Get Razorpay order from backend
    const response = await fetch('http://localhost:8080/api/payments/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Math.round(finalTotal * 100), // Convert to paise
        orderId: order.id,
      }),
    });
    
    const razorpayOrder = await response.json();
    
    const options = {
      key: 'rzp_test_YOUR_KEY_HERE', // Replace with your Razorpay test key
      amount: razorpayOrder.amount,
      currency: 'INR',
      name: 'JyotiFlame Candles',
      description: `Order #${order.orderNumber}`,
      order_id: razorpayOrder.id,
      handler: async function (response: any) {
        // Payment successful
        try {
          await dispatch(updateOrderPayment({
            orderId: order.id,
            paymentId: response.razorpay_payment_id,
            status: 'completed'
          }) as any);
          
          dispatch(clearCart());
          setProcessingPayment(false);
          alert('Payment successful! Order placed. 🎉');
          onOrderComplete();
        } catch (error) {
          console.error('Payment update failed:', error);
          setProcessingPayment(false);
        }
      },
      prefill: {
        name: shippingAddress.fullName,
        email: shippingAddress.email,
        contact: shippingAddress.phone,
      },
      theme: {
        color: '#d946ef',
      },
      modal: {
        ondismiss: function() {
          setProcessingPayment(false);
        }
      }
    };
    
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  
  return (
    <div className="checkout">
      <div className="checkout__container">
        <h1 className="checkout__title">Checkout</h1>
        
        <div className="checkout__content">
          <form className="checkout-form" onSubmit={handleSubmit}>
            {/* Shipping Address */}
            <div className="checkout-form__section">
              <h2 className="checkout-form__section-title">
                <MapPin style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
                Shipping Address
              </h2>
              
              <div className="checkout-form__row">
                <div className="checkout-form__group">
                  <label className="checkout-form__label">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    className="checkout-form__input"
                    placeholder="John Doe"
                    value={shippingAddress.fullName}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                
                <div className="checkout-form__group">
                  <label className="checkout-form__label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    className="checkout-form__input"
                    placeholder="john@example.com"
                    value={shippingAddress.email}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </div>
              
              <div className="checkout-form__row">
                <div className="checkout-form__group">
                  <label className="checkout-form__label">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    className="checkout-form__input"
                    placeholder="+91 98765 43210"
                    value={shippingAddress.phone}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                
                <div className="checkout-form__group">
                  <label className="checkout-form__label">Country *</label>
                  <input
                    type="text"
                    name="country"
                    className="checkout-form__input"
                    placeholder="India"
                    value={shippingAddress.country}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </div>
              
              <div className="checkout-form__row checkout-form__row--full">
                <div className="checkout-form__group">
                  <label className="checkout-form__label">Address *</label>
                  <textarea
                    name="address"
                    className="checkout-form__input checkout-form__textarea"
                    placeholder="123 Main Street, Apt 4B"
                    value={shippingAddress.address}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </div>
              
              <div className="checkout-form__row">
                <div className="checkout-form__group">
                  <label className="checkout-form__label">City *</label>
                  <input
                    type="text"
                    name="city"
                    className="checkout-form__input"
                    placeholder="Faridabad"
                    value={shippingAddress.city}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                
                <div className="checkout-form__group">
                  <label className="checkout-form__label">State *</label>
                  <input
                    type="text"
                    name="state"
                    className="checkout-form__input"
                    placeholder="Haryana"
                    value={shippingAddress.state}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </div>
              
              <div className="checkout-form__row">
                <div className="checkout-form__group">
                  <label className="checkout-form__label">PIN Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    className="checkout-form__input"
                    placeholder="121001"
                    value={shippingAddress.zipCode}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Payment Info */}
            <div className="checkout-form__section">
              <h2 className="checkout-form__section-title">
                <CreditCard style={{ width: '1.5rem', height: '1.5rem', color: '#d946ef' }} />
                Payment Method
              </h2>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                You will be redirected to Razorpay secure payment gateway to complete your payment.
              </p>
            </div>
          </form>
          
          {/* Order Summary */}
          <div className="order-summary">
            <h3 className="order-summary__title">Order Summary</h3>
            
            <div className="order-summary__items">
              {items.map((item) => (
                <div key={item.id} className="order-summary__item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img 
                      src={item.image || "https://via.placeholder.com/60"} 
                      alt={item.name}
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <div>
                      <div className="order-summary__item-name">{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                        {item.description.substring(0, 40)}...
                      </div>
                      <div className="order-summary__item-quantity">Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="order-summary__item-price">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-summary__totals">
              <div className="order-summary__row">
                <span className="order-summary__label">Subtotal</span>
                <span className="order-summary__value">₹{total.toFixed(2)}</span>
              </div>
              
              <div className="order-summary__row">
                <span className="order-summary__label">Shipping</span>
                <span className="order-summary__value">₹{shipping.toFixed(2)}</span>
              </div>
              
              <div className="order-summary__row">
                <span className="order-summary__label">Tax (10%)</span>
                <span className="order-summary__value">₹{tax.toFixed(2)}</span>
              </div>
              
              <div className="order-summary__row order-summary__row--total">
                <span className="order-summary__label">Total</span>
                <span className="order-summary__value">₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              variant="primary" 
              className="order-summary__button"
              onClick={handleSubmit}
              // disabled={loading || processingPayment}
            >
              {processingPayment ? (
                'Processing...'
              ) : (
                <>
                  <CheckCircle style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                  Proceed to Payment
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};