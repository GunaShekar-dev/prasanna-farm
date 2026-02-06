// Main product data export - Combines all categories
// 150 products across 5 categories for Prasanna Farm

import { vegetables, Product } from "./products/vegetables";
import { fruits } from "./products/fruits";
import { leafyGreens } from "./products/leafy-greens";
import { dairyProducts } from "./products/dairy";
import { grainsPulses } from "./products/grains-pulses";

// Re-export Product type
export type { Product };

// Category interface
export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

// Updated categories to match the 5 main sections
export const categories: Category[] = [
  {
    id: "vegetables",
    name: "Vegetables",
    description: "Fresh organic vegetables straight from our farm fields",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
    productCount: vegetables.length,
  },
  {
    id: "fruits",
    name: "Fruits",
    description: "Sweet and nutritious seasonal fruits bursting with flavor",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=80",
    productCount: fruits.length,
  },
  {
    id: "leafy-greens",
    name: "Leafy Greens",
    description: "Vitamin-rich leafy vegetables for healthy living",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&q=80",
    productCount: leafyGreens.length,
  },
  {
    id: "dairy",
    name: "Dairy Products",
    description: "Fresh milk, cheese, butter, and more from happy cows",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80",
    productCount: dairyProducts.length,
  },
  {
    id: "grains",
    name: "Grains & Pulses",
    description: "Nutritious whole grains and protein-rich pulses",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",
    productCount: grainsPulses.length,
  },
];

// Combine all products
export const products: Product[] = [
  ...vegetables,
  ...fruits,
  ...leafyGreens,
  ...dairyProducts,
  ...grainsPulses,
];

// Get products by category
export const getProductsByCategory = (categoryId: string): Product[] => {
  if (categoryId === "all") return products;
  return products.filter((p) => p.category === categoryId);
};

// Get single product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

// Get category by ID
export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((c) => c.id === id);
};

// Get featured products (random selection or top-rated)
export const getFeaturedProducts = (count: number = 8): Product[] => {
  return [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
};

// Search products
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
};
