// src/store/orderSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://localhost:8080/api';

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
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

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

// Async thunks using fetch
export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    
    return await response.json();
  }
);

// FIXED: Updated endpoint to match backend
export const fetchOrders = createAsyncThunk(
  'orders/fetchAll',
  async (email: string) => {
    console.log('Fetching orders for email:', email); // Debug log
    const url = `${API_BASE_URL}/orders/by-email?email=${encodeURIComponent(email)}`;
    console.log('API URL:', url); // Debug log
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error('Failed to fetch orders');
    }
    
    const data = await response.json();
    console.log('Received orders:', data); // Debug log
    return data;
  }
);

export const updateOrderPayment = createAsyncThunk(
  'orders/updatePayment',
  async ({ orderId, paymentId, status }: { orderId: string; paymentId: string; status: string }) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/payment`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentId, paymentStatus: status }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update payment');
    }
    
    return await response.json();
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    setCurrentOrder: (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create order';
      })
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      })
      // Update Payment
      .addCase(updateOrderPayment.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = action.payload;
        }
      });
  },
});

export const { clearCurrentOrder, setCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;