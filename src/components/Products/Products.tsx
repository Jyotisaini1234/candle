import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import './Products.scss';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
}

interface ProductsProps {
  products: Product[];
  onAddToCart: () => void;
}

export const Products: React.FC<ProductsProps> = ({ products, onAddToCart }) => {
  return (
    <section id="shop" className="products">
      <div className="products__container">
        <div className="products__header">
          <h2 className="products__title">Our Collection</h2>
          <p className="products__subtitle">Discover your perfect scent</p>
        </div>
        
        <div className="products__grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
