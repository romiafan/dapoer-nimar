// Shared TypeScript types for the e-commerce application

// Firebase Timestamp type (for compatibility)
export interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
  toDate(): Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  available?: boolean;
  createdAt?: Date | FirebaseTimestamp;
  updatedAt?: Date | FirebaseTimestamp;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

export interface Order {
  id: string;
  name: string;
  address: string;
  phone: string;
  items: CartItem[];
  total: number;
  createdAt: Date | FirebaseTimestamp;
  status?: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentStatus?: 'pending' | 'paid' | 'failed';
}

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt?: Date | FirebaseTimestamp;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface CheckoutFormData {
  name: string;
  address: string;
  phone: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}