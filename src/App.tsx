import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Products } from './components/Products/Products';
import { Features } from './components/Features/Features';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { Cart } from './components/Cart/Cart';
import { Checkout } from './components/Checkout/Checkout';
import { Orders } from './components/Orders/Orders';
import candleData from "./data/candle.json";
import './styles/globals.scss';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
}

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'cart' | 'checkout' | 'orders'>('home');

  const products = candleData as Product[];

  const handleCartClick = () => {
    setCurrentPage('cart');
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
  };

  const handleOrderComplete = () => {
    alert('Thank you for your order! 🎉');
    setCurrentPage('orders');
  };

  const handleLogoClick = () => {
    setCurrentPage('home');
  };

  const handleContinueShopping = () => {
    setCurrentPage('home');
  };

  const handleViewOrders = () => {
    setCurrentPage('orders');
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #dbeafe, #fae8ff)', minHeight: '100vh' }}>
      <Header 
        onCartClick={handleCartClick} 
        onLogoClick={handleLogoClick}
        onOrdersClick={handleViewOrders}
      />
      
      {currentPage === 'home' && (
        <>
          <Hero />
          <Products products={products} onAddToCart={() => {}} />
          <Features />
          <About />
          <Contact />
          <Footer />
        </>
      )}
      
      {currentPage === 'cart' && (
        <Cart onCheckout={handleCheckout} onContinueShopping={handleContinueShopping} />
      )}
      
      {currentPage === 'checkout' && (
        <Checkout onOrderComplete={handleOrderComplete} />
      )}
      
      {currentPage === 'orders' && (
        <Orders onBack={() => setCurrentPage('home')} />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
