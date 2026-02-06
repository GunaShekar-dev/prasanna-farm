import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/lib/data";
import { cartApi, ApiError } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  useApi: boolean;
  setUseApi: (value: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Check if API is available
const API_ENABLED = !!import.meta.env.VITE_API_URL;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [useApi, setUseApi] = useState(API_ENABLED);
  const { toast } = useToast();

  // Load cart from API or localStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      if (useApi) {
        setIsLoading(true);
        try {
          const cart = await cartApi.get();
          setItems(cart.items.map(item => ({ ...item.product, quantity: item.quantity })));
        } catch (error) {
          // Fallback to localStorage if API fails
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            setItems(JSON.parse(savedCart));
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setItems(JSON.parse(savedCart));
        }
      }
    };
    loadCart();
  }, [useApi]);

  // Sync to localStorage as backup
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = async (product: Product, quantity = 1) => {
    if (useApi) {
      setIsLoading(true);
      try {
        const cart = await cartApi.addItem(product.id, quantity);
        setItems(cart.items.map(item => ({ ...item.product, quantity: item.quantity })));
        toast({ title: "Added to cart", description: `${product.name} added to your cart.` });
      } catch (error) {
        // Fallback to local state
        addItemLocal(product, quantity);
        if (error instanceof ApiError) {
          console.warn('API error, using local cart:', error.message);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      addItemLocal(product, quantity);
    }
  };

  const addItemLocal = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeItem = async (productId: string) => {
    if (useApi) {
      setIsLoading(true);
      try {
        const cart = await cartApi.removeItem(productId);
        setItems(cart.items.map(item => ({ ...item.product, quantity: item.quantity })));
      } catch (error) {
        removeItemLocal(productId);
      } finally {
        setIsLoading(false);
      }
    } else {
      removeItemLocal(productId);
    }
  };

  const removeItemLocal = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    if (useApi) {
      setIsLoading(true);
      try {
        const cart = await cartApi.updateItem(productId, quantity);
        setItems(cart.items.map(item => ({ ...item.product, quantity: item.quantity })));
      } catch (error) {
        updateQuantityLocal(productId, quantity);
      } finally {
        setIsLoading(false);
      }
    } else {
      updateQuantityLocal(productId, quantity);
    }
  };

  const updateQuantityLocal = (productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = async () => {
    if (useApi) {
      setIsLoading(true);
      try {
        await cartApi.clear();
        setItems([]);
      } catch (error) {
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setItems([]);
    }
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isLoading,
        useApi,
        setUseApi,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
