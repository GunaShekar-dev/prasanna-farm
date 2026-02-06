// Spring Boot API Configuration and Service Layer

// Base API URL - update this to your Spring Boot server address
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// API Response type
interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Generic fetch wrapper with error handling
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData
      );
    }

    // Handle empty responses
    const text = await response.text();
    return text ? JSON.parse(text) : ({} as T);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error. Please check your connection.', 0);
  }
}

// Custom API Error class
export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// ============================================
// AUTH API
// ============================================
export const authApi = {
  login: async (email: string, password: string) => {
    return apiRequest<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData: RegisterData) => {
    return apiRequest<{ token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  logout: async () => {
    return apiRequest<void>('/auth/logout', {
      method: 'POST',
    });
  },

  getCurrentUser: async () => {
    return apiRequest<User>('/auth/me');
  },
};

// ============================================
// PRODUCTS API
// ============================================
export const productsApi = {
  getAll: async (params?: ProductQueryParams) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return apiRequest<PaginatedResponse<Product>>(`/products${query}`);
  },

  getById: async (id: string) => {
    return apiRequest<Product>(`/products/${id}`);
  },

  getByCategory: async (categoryId: string) => {
    return apiRequest<Product[]>(`/products/category/${categoryId}`);
  },

  search: async (query: string) => {
    return apiRequest<Product[]>(`/products/search?q=${encodeURIComponent(query)}`);
  },
};

// ============================================
// CATEGORIES API
// ============================================
export const categoriesApi = {
  getAll: async () => {
    return apiRequest<Category[]>('/categories');
  },

  getById: async (id: string) => {
    return apiRequest<Category>(`/categories/${id}`);
  },
};

// ============================================
// CART API
// ============================================
export const cartApi = {
  get: async () => {
    return apiRequest<Cart>('/cart');
  },

  addItem: async (productId: string, quantity: number) => {
    return apiRequest<Cart>('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  updateItem: async (productId: string, quantity: number) => {
    return apiRequest<Cart>(`/cart/items/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },

  removeItem: async (productId: string) => {
    return apiRequest<Cart>(`/cart/items/${productId}`, {
      method: 'DELETE',
    });
  },

  clear: async () => {
    return apiRequest<void>('/cart', {
      method: 'DELETE',
    });
  },
};

// ============================================
// ORDERS API
// ============================================
export const ordersApi = {
  create: async (orderData: CreateOrderData) => {
    return apiRequest<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getAll: async () => {
    return apiRequest<Order[]>('/orders');
  },

  getById: async (id: string) => {
    return apiRequest<Order>(`/orders/${id}`);
  },

  cancel: async (id: string) => {
    return apiRequest<Order>(`/orders/${id}/cancel`, {
      method: 'PUT',
    });
  },
};

// ============================================
// PAYMENT API
// ============================================
export const paymentApi = {
  initiatePayment: async (orderId: string, paymentMethod: PaymentMethod) => {
    return apiRequest<PaymentResponse>('/payments/initiate', {
      method: 'POST',
      body: JSON.stringify({ orderId, paymentMethod }),
    });
  },

  verifyPayment: async (paymentId: string, verificationData: PaymentVerification) => {
    return apiRequest<PaymentStatus>('/payments/verify', {
      method: 'POST',
      body: JSON.stringify({ paymentId, ...verificationData }),
    });
  },
};

// ============================================
// TYPE DEFINITIONS
// ============================================
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: Address;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isOrganic: boolean;
  isFresh: boolean;
  unit: string;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface CreateOrderData {
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  items: { productId: string; quantity: number }[];
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: Address;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'upi' | 'card' | 'wallet' | 'cod' | 'paylater';

export interface PaymentResponse {
  paymentId: string;
  orderId: string;
  amount: number;
  redirectUrl?: string;
  qrCode?: string;
}

export interface PaymentVerification {
  transactionId?: string;
  signature?: string;
}

export interface ProductQueryParams {
  category?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
}
