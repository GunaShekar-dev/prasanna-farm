import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/products/ProductCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function FeaturedProducts() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const featuredProducts = products.slice(0, 4);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container-luxury px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 reveal">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
              Featured Products
            </span>
            <h2 className="heading-section text-foreground">
              Farm Fresh Bestsellers
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
