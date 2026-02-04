import { Link } from "react-router-dom";
import { Category } from "@/lib/data";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="group relative overflow-hidden rounded-3xl aspect-[4/3] block"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="transform transition-transform duration-500 group-hover:translate-y-[-8px]">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary-foreground backdrop-blur-sm mb-3">
            {category.productCount} Products
          </span>
          <h3 className="font-display text-2xl font-bold text-card mb-2">
            {category.name}
          </h3>
          <p className="text-card/80 text-sm mb-4 line-clamp-2">
            {category.description}
          </p>
          <div className="flex items-center gap-2 text-primary-foreground font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Explore</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
