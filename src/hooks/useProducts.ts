// Hook for fetching products from Spring Boot API with fallback to static data

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productsApi, categoriesApi } from '@/lib/api';
import { 
  products as staticProducts, 
  categories as staticCategories, 
  getProductsByCategory, 
  getProductById, 
  getCategoryById, 
  searchProducts,
  type Product, 
  type Category 
} from '@/lib/data';

// Check if API is configured
const API_ENABLED = !!import.meta.env.VITE_API_URL;

export function useProducts(categoryId?: string) {
  const [useApi] = useState(API_ENABLED);

  // API query
  const apiQuery = useQuery({
    queryKey: ['products', categoryId],
    queryFn: async () => {
      if (categoryId && categoryId !== 'all') {
        return productsApi.getByCategory(categoryId);
      }
      const response = await productsApi.getAll();
      return response.content || response;
    },
    enabled: useApi,
    staleTime: 2 * 60 * 1000,
    retry: 1,
  });

  // Return API data or fallback to static data
  const products = useMemo(() => {
    if (useApi && apiQuery.data) {
      return apiQuery.data as Product[];
    }
    return categoryId ? getProductsByCategory(categoryId) : staticProducts;
  }, [useApi, apiQuery.data, categoryId]);

  return {
    products,
    isLoading: useApi ? apiQuery.isLoading : false,
    isError: useApi ? apiQuery.isError : false,
    error: apiQuery.error,
    refetch: apiQuery.refetch,
    isUsingApi: useApi && !apiQuery.isError,
  };
}

export function useProduct(id: string) {
  const [useApi] = useState(API_ENABLED);

  const apiQuery = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getById(id),
    enabled: useApi && !!id,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const product = useMemo(() => {
    if (useApi && apiQuery.data) {
      return apiQuery.data as Product;
    }
    return getProductById(id);
  }, [useApi, apiQuery.data, id]);

  return {
    product,
    isLoading: useApi ? apiQuery.isLoading : false,
    isError: useApi ? apiQuery.isError : false,
    error: apiQuery.error,
    isUsingApi: useApi && !apiQuery.isError,
  };
}

export function useCategories() {
  const [useApi] = useState(API_ENABLED);

  const apiQuery = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAll,
    enabled: useApi,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  const categories = useMemo(() => {
    if (useApi && apiQuery.data) {
      return apiQuery.data as Category[];
    }
    return staticCategories;
  }, [useApi, apiQuery.data]);

  return {
    categories,
    isLoading: useApi ? apiQuery.isLoading : false,
    isError: useApi ? apiQuery.isError : false,
    error: apiQuery.error,
    isUsingApi: useApi && !apiQuery.isError,
  };
}

export function useCategory(id: string) {
  const [useApi] = useState(API_ENABLED);

  const apiQuery = useQuery({
    queryKey: ['category', id],
    queryFn: () => categoriesApi.getById(id),
    enabled: useApi && !!id,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  const category = useMemo(() => {
    if (useApi && apiQuery.data) {
      return apiQuery.data as Category;
    }
    return getCategoryById(id);
  }, [useApi, apiQuery.data, id]);

  return {
    category,
    isLoading: useApi ? apiQuery.isLoading : false,
    isError: useApi ? apiQuery.isError : false,
    isUsingApi: useApi && !apiQuery.isError,
  };
}

export function useProductSearch(query: string) {
  const [useApi] = useState(API_ENABLED);

  const apiQuery = useQuery({
    queryKey: ['products', 'search', query],
    queryFn: () => productsApi.search(query),
    enabled: useApi && query.length >= 2,
    staleTime: 60 * 1000,
  });

  const results = useMemo(() => {
    if (useApi && apiQuery.data) {
      return apiQuery.data as Product[];
    }
    // Fallback: local search
    if (query.length >= 2) {
      return searchProducts(query);
    }
    return [];
  }, [useApi, apiQuery.data, query]);

  return {
    results,
    isLoading: useApi ? apiQuery.isLoading : false,
    isSearching: apiQuery.isFetching,
  };
}
