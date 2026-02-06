import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Plus, Check, Leaf, Heart } from "lucide-react";
import { Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
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

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'vegetables': 'Vegetables',
      'fruits': 'Fruits',
      'leafy-greens': 'Leafy Greens',
      'dairy': 'Dairy Products',
      'grains': 'Grains & Pulses',
    };
    return labels[category] || category;
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group block"
    >
      <div className="glass-card overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse" />
          )}
          
          <img
            src={product.image}
            alt={product.name}
            className={cn(
              "w-full h-full object-cover transition-all duration-700 group-hover:scale-110",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              // Fallback image on error
              e.currentTarget.src = `https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80`;
              setImageLoaded(true);
            }}
          />
          
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isOrganic && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/90 text-primary-foreground backdrop-blur-sm shadow-lg">
                <Leaf className="w-3 h-3" />
                Organic
              </span>
            )}
            {discount > 0 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-destructive text-destructive-foreground shadow-lg animate-pulse">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={cn(
              "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm shadow-lg",
              isWishlisted
                ? "bg-destructive text-destructive-foreground scale-110"
                : "bg-white/80 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            )}
          >
            <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding || isAdded}
            className={cn(
              "absolute bottom-3 right-3 flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg transform",
              isAdded
                ? "bg-primary text-primary-foreground scale-105"
                : "bg-white/90 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:scale-105",
              "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
            )}
          >
            {isAdding ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : isAdded ? (
              <>
                <Check className="w-4 h-4" />
                Added
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add
              </>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {/* Category */}
          <span className="text-xs font-medium text-primary/80 uppercase tracking-wider">
            {getCategoryLabel(product.category)}
          </span>

          {/* Name */}
          <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3.5 h-3.5 transition-colors",
                    i < Math.floor(product.rating)
                      ? "text-accent fill-accent"
                      : "text-muted-foreground/30"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">
              {product.unit}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
