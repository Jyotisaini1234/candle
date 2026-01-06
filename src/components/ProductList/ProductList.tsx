import { Product } from "../../types";
import { ProductCard } from "../ProductCard/ProductCard";
import candleData from "../../data/candle.json"

const ProductList = () => {

  const products = candleData as Product[];

  const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product);
  };

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
