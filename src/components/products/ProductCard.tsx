import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Plus, Check, Leaf } from "lucide-react";
import { Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    setTimeout(() => {
      addItem(product);
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }, 400);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link 
      to={`/product/${product.id}`}
      className="product-card block"
    >
      {/* Image Container */}
      <div className="product-image relative aspect-square mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isOrganic && (
            <span className="badge-organic">
              <Leaf className="w-3 h-3" />
              Organic
            </span>
          )}
          {discount > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-destructive/90 text-destructive-foreground">
              -{discount}%
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || isAdded}
          className={cn(
            "absolute bottom-3 right-3 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg",
            isAdded
              ? "bg-primary text-primary-foreground scale-110"
              : "bg-card/90 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:scale-110"
          )}
        >
          {isAdding ? (
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : isAdded ? (
            <Check className="w-5 h-5" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Category */}
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {product.category.replace("-", " ")}
        </span>

        {/* Name */}
        <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3.5 h-3.5",
                  i < Math.floor(product.rating)
                    ? "text-accent fill-accent"
                    : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-xl font-bold text-primary">
            ₹{product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice}
            </span>
          )}
          <span className="text-xs text-muted-foreground ml-auto">
            {product.unit}
          </span>
        </div>
      </div>
    </Link>
  );
}
