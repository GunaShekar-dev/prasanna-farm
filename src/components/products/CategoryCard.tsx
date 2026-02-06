import { useState } from "react";
import { Link } from "react-router-dom";
import { Category } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      to={`/products?category=${category.id}`}
      className="group relative overflow-hidden rounded-2xl aspect-[3/4] block shadow-lg hover:shadow-2xl transition-shadow duration-500"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse" />
        )}
        
        <img
          src={category.image}
          alt={category.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700 group-hover:scale-110",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = `https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80`;
            setImageLoaded(true);
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end">
        <div className="transform transition-transform duration-500 group-hover:translate-y-[-8px]">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground backdrop-blur-sm mb-3 shadow-lg">
            {category.productCount} Products
          </span>
          <h3 className="font-display text-lg md:text-xl font-bold text-white mb-1">
            {category.name}
          </h3>
          <p className="text-white/70 text-xs md:text-sm line-clamp-2 mb-3">
            {category.description}
          </p>
          <div className="flex items-center gap-2 text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
            <span>Explore</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
