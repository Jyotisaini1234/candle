export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  className?: string;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export interface FeatureProps {
  title: string;
  description: string;
  icon: string;
}
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
}
export interface CartItem extends Product {
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentDetails {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}