// Product and Category Data for Prasanna Farm

import categoryVegetables from "@/assets/category-vegetables.jpg";
import categoryFruits from "@/assets/category-fruits.jpg";
import categoryLeafy from "@/assets/category-leafy.jpg";
import categoryDairy from "@/assets/category-dairy.jpg";
import categoryGrains from "@/assets/category-grains.jpg";
import categoryOrganic from "@/assets/category-organic.jpg";

import productTomato from "@/assets/product-tomato.jpg";
import productPotato from "@/assets/product-potato.jpg";
import productCarrot from "@/assets/product-carrot.jpg";
import productSpinach from "@/assets/product-spinach.jpg";
import productMango from "@/assets/product-mango.jpg";
import productOnion from "@/assets/product-onion.jpg";
import productMilk from "@/assets/product-milk.jpg";

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
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

export const categories: Category[] = [
  {
    id: "vegetables",
    name: "Vegetables",
    description: "Fresh organic vegetables from our farm",
    image: categoryVegetables,
    productCount: 24,
  },
  {
    id: "fruits",
    name: "Fruits",
    description: "Sweet and nutritious seasonal fruits",
    image: categoryFruits,
    productCount: 18,
  },
  {
    id: "leafy-greens",
    name: "Leafy Greens",
    description: "Vitamin-rich leafy vegetables",
    image: categoryLeafy,
    productCount: 12,
  },
  {
    id: "dairy",
    name: "Dairy Products",
    description: "Fresh milk, cheese, and more",
    image: categoryDairy,
    productCount: 15,
  },
  {
    id: "grains",
    name: "Grains & Pulses",
    description: "Nutritious whole grains and pulses",
    image: categoryGrains,
    productCount: 20,
  },
  {
    id: "organic",
    name: "Organic Products",
    description: "100% certified organic products",
    image: categoryOrganic,
    productCount: 30,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Fresh Organic Tomatoes",
    description: "Juicy, vine-ripened tomatoes grown without pesticides. Perfect for salads and cooking.",
    price: 45,
    originalPrice: 60,
    image: productTomato,
    category: "vegetables",
    rating: 4.8,
    reviews: 124,
    isOrganic: true,
    isFresh: true,
    unit: "per kg",
    stock: 50,
  },
  {
    id: "2",
    name: "Farm Fresh Potatoes",
    description: "Earthy, versatile potatoes perfect for all your cooking needs. Locally grown.",
    price: 35,
    originalPrice: 45,
    image: productPotato,
    category: "vegetables",
    rating: 4.6,
    reviews: 89,
    isOrganic: true,
    isFresh: true,
    unit: "per kg",
    stock: 100,
  },
  {
    id: "3",
    name: "Organic Carrots",
    description: "Sweet, crunchy carrots rich in beta-carotene. Freshly harvested from our fields.",
    price: 55,
    originalPrice: 70,
    image: productCarrot,
    category: "vegetables",
    rating: 4.9,
    reviews: 156,
    isOrganic: true,
    isFresh: true,
    unit: "per kg",
    stock: 75,
  },
  {
    id: "4",
    name: "Fresh Spinach Bunch",
    description: "Nutrient-packed spinach leaves, perfect for salads, smoothies, and cooking.",
    price: 30,
    originalPrice: 40,
    image: productSpinach,
    category: "leafy-greens",
    rating: 4.7,
    reviews: 98,
    isOrganic: true,
    isFresh: true,
    unit: "per bunch",
    stock: 40,
  },
  {
    id: "5",
    name: "Alphonso Mangoes",
    description: "The king of mangoes! Sweet, aromatic, and perfectly ripe seasonal delicacy.",
    price: 350,
    originalPrice: 450,
    image: productMango,
    category: "fruits",
    rating: 5.0,
    reviews: 234,
    isOrganic: true,
    isFresh: true,
    unit: "per dozen",
    stock: 25,
  },
  {
    id: "6",
    name: "Fresh Onions",
    description: "Flavorful onions essential for every kitchen. Stored and packed with care.",
    price: 40,
    originalPrice: 50,
    image: productOnion,
    category: "vegetables",
    rating: 4.5,
    reviews: 67,
    isOrganic: true,
    isFresh: true,
    unit: "per kg",
    stock: 120,
  },
  {
    id: "7",
    name: "Farm Fresh Milk",
    description: "Pure, pasteurized milk from our happy grass-fed cows. Rich and creamy.",
    price: 70,
    originalPrice: 80,
    image: productMilk,
    category: "dairy",
    rating: 4.9,
    reviews: 312,
    isOrganic: true,
    isFresh: true,
    unit: "per liter",
    stock: 60,
  },
  {
    id: "8",
    name: "Organic Potatoes",
    description: "Premium organic potatoes, perfect for roasting, mashing, or frying.",
    price: 50,
    originalPrice: 65,
    image: productPotato,
    category: "organic",
    rating: 4.7,
    reviews: 145,
    isOrganic: true,
    isFresh: true,
    unit: "per kg",
    stock: 80,
  },
];

export const getProductsByCategory = (categoryId: string): Product[] => {
  if (categoryId === "all") return products;
  return products.filter((p) => p.category === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find((c) => c.id === id);
};
