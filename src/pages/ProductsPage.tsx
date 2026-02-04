import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Grid3X3, LayoutList, SlidersHorizontal } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { products, categories, getProductsByCategory } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const sectionRef = useScrollReveal<HTMLElement>();

  const filteredProducts = useMemo(() => {
    let filtered = getProductsByCategory(activeCategory);

    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [activeCategory, sortBy]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (categoryId === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", categoryId);
    }
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      <section ref={sectionRef} className="pt-32 pb-20 min-h-screen">
        <div className="container-luxury px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 reveal">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Our Products
            </span>
            <h1 className="heading-section text-foreground mb-4">
              Fresh Farm Produce
            </h1>
            <p className="text-body text-muted-foreground">
              Explore our wide selection of organic vegetables, fruits, dairy, and more.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="glass-card mb-8 reveal">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hidden pb-2 lg:pb-0">
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300",
                    activeCategory === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300",
                      activeCategory === cat.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>

                {/* View Toggle */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 rounded-lg transition-all duration-300",
                      viewMode === "grid"
                        ? "bg-card shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 rounded-lg transition-all duration-300",
                      viewMode === "list"
                        ? "bg-card shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6 reveal">
            Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
          </p>

          {/* Products Grid */}
          <div
            className={cn(
              "stagger-children",
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            )}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 reveal">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Filter className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No products found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or browse all products.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
