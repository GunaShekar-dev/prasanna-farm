// Custom React hooks for API calls with loading and error states

import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  productsApi, 
  categoriesApi, 
  cartApi, 
  ordersApi, 
  authApi,
  ApiError,
  type Product,
  type Category,
  type Cart,
  type Order,
  type User,
  type CreateOrderData,
  type ProductQueryParams,
} from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

// ============================================
// AUTH HOOKS
// ============================================
export function useAuth() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password),
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token);
      queryClient.setQueryData(['currentUser'], data.user);
      toast({ title: 'Welcome back!', description: 'You have successfully logged in.' });
    },
    onError: (error: ApiError) => {
      toast({ 
        title: 'Login failed', 
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      localStorage.removeItem('authToken');
      queryClient.clear();
      toast({ title: 'Logged out', description: 'You have been logged out successfully.' });
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoggingIn: loginMutation.isPending,
  };
}

// ============================================
// PRODUCTS HOOKS
// ============================================
export function useProducts(params?: ProductQueryParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsApi.getAll(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
}

export function useProductsByCategory(categoryId: string) {
  return useQuery({
    queryKey: ['products', 'category', categoryId],
    queryFn: () => productsApi.getByCategory(categoryId),
    enabled: !!categoryId && categoryId !== 'all',
  });
}

export function useProductSearch(query: string) {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: () => productsApi.search(query),
    enabled: query.length >= 2,
  });
}

// ============================================
// CATEGORIES HOOKS
// ============================================
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAll,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoriesApi.getById(id),
    enabled: !!id,
  });
}

// ============================================
// CART HOOKS
// ============================================
export function useCart() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: cartApi.get,
    staleTime: 30 * 1000, // 30 seconds
  });

  const addItemMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      cartApi.addItem(productId, quantity),
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
      toast({ title: 'Added to cart', description: 'Item has been added to your cart.' });
    },
    onError: (error: ApiError) => {
      toast({ 
        title: 'Failed to add item', 
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      cartApi.updateItem(productId, quantity),
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    },
    onError: (error: ApiError) => {
      toast({ 
        title: 'Failed to update', 
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (productId: string) => cartApi.removeItem(productId),
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
      toast({ title: 'Item removed', description: 'Item has been removed from your cart.' });
    },
    onError: (error: ApiError) => {
      toast({ 
        title: 'Failed to remove', 
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: cartApi.clear,
    onSuccess: () => {
      queryClient.setQueryData(['cart'], { items: [], total: 0, itemCount: 0 });
    },
  });

  return {
    cart,
    isLoading,
    addItem: addItemMutation.mutate,
    updateItem: updateItemMutation.mutate,
    removeItem: removeItemMutation.mutate,
    clearCart: clearCartMutation.mutate,
    isUpdating: updateItemMutation.isPending || addItemMutation.isPending,
  };
}

// ============================================
// ORDERS HOOKS
// ============================================
export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: ordersApi.getAll,
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => ordersApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: CreateOrderData) => ordersApi.create(orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({ title: 'Order placed!', description: 'Your order has been successfully placed.' });
    },
    onError: (error: ApiError) => {
      toast({ 
        title: 'Order failed', 
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

// ============================================
// GENERIC API HOOK
// ============================================
export function useApiCall<T, P = void>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const execute = useCallback(async (apiCall: (params: P) => Promise<T>, params: P) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall(params);
      setData(result);
      return result;
    } catch (err) {
      const apiError = err instanceof ApiError ? err : new ApiError('An error occurred', 0);
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
}
