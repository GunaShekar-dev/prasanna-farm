import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Grid3X3, LayoutList, Loader2, Search, X } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { categories, getProductsByCategory, searchProducts } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Input } from "@/components/ui/input";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useScrollReveal<HTMLElement>();

  // Simulate loading when category changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    let filtered = searchQuery 
      ? searchProducts(searchQuery) 
      : getProductsByCategory(activeCategory);

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
      case "name":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [activeCategory, sortBy, searchQuery]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchQuery(""); // Clear search when changing category
    if (categoryId === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", categoryId);
    }
    setSearchParams(searchParams);
  };

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return 150;
    const category = categories.find(c => c.id === categoryId);
    return category?.productCount || 0;
  };

  return (
    <Layout>
      <section ref={sectionRef} className="pt-32 pb-20 min-h-screen">
        <div className="container-luxury px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 reveal">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4 animate-fade-in">
              Prasanna Farm Products
            </span>
            <h1 className="heading-section text-foreground mb-4">
              Fresh Farm Produce
            </h1>
            <p className="text-body text-muted-foreground mb-8">
              Explore our wide selection of 150+ organic vegetables, fruits, dairy, grains, and more — delivered fresh from our farm to your home.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-10 h-12 rounded-2xl border-2 border-border/50 focus:border-primary/50 bg-card/50 backdrop-blur-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Premium Category Filter Tabs */}
          <div className="mb-10 reveal">
            <div className="glass-card !p-2 overflow-hidden">
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-hidden py-1">
                {/* All Products Tab */}
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={cn(
                    "relative px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-500 group",
                    activeCategory === "all"
                      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  )}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    All Products
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-bold transition-colors",
                      activeCategory === "all" 
                        ? "bg-white/20 text-white" 
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    )}>
                      150
                    </span>
                  </span>
                  {activeCategory === "all" && (
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-primary/80 animate-pulse opacity-50" />
                  )}
                </button>

                {/* Category Tabs */}
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={cn(
                      "relative px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-500 group",
                      activeCategory === cat.id
                        ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    )}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {cat.name}
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-bold transition-colors",
                        activeCategory === cat.id 
                          ? "bg-white/20 text-white" 
                          : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                      )}>
                        {cat.productCount}
                      </span>
                    </span>
                    {activeCategory === cat.id && (
                      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-primary/80 animate-pulse opacity-50" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 reveal">
            {/* Results Count */}
            <p className="text-muted-foreground">
              {searchQuery ? (
                <>
                  Found <span className="font-semibold text-foreground">{filteredProducts.length}</span> results for "{searchQuery}"
                </>
              ) : (
                <>
                  Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
                  {activeCategory !== "all" && (
                    <span className="text-primary"> in {categories.find(c => c.id === activeCategory)?.name}</span>
                  )}
                </>
              )}
            </p>

            {/* Sort & View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 rounded-xl border-2 border-border/50 bg-card/50 backdrop-blur-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 cursor-pointer transition-all"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name A-Z</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1.5 rounded-xl bg-secondary/50 backdrop-blur-sm border border-border/30">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2.5 rounded-lg transition-all duration-300",
                    viewMode === "grid"
                      ? "bg-card shadow-md text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2.5 rounded-lg transition-all duration-300",
                    viewMode === "list"
                      ? "bg-card shadow-md text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && (
            <div
              className={cn(
                "transition-all duration-500",
                viewMode === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                  : "space-y-4"
              )}
            >
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-20 reveal">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Filter className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                No products found
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {searchQuery 
                  ? `We couldn't find any products matching "${searchQuery}". Try a different search term.`
                  : "Try adjusting your filters or browse all products."
                }
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleCategoryChange("all");
                }}
                className="btn-primary"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
