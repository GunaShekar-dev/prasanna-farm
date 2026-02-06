import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RefreshCcw,
  Leaf,
  Check,
  Loader2,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, isLoading } = useProduct(id || "");
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Get related products from same category
  const { products: relatedProducts } = useProducts(product?.category);
  const filteredRelated = relatedProducts
    .filter((p) => p.id !== product?.id)
    .slice(0, 4);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-section text-foreground mb-4">
              Product Not Found
            </h1>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addItem(product, quantity);
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }, 500);
  };

  const features = [
    { icon: Truck, title: "Free Delivery", desc: "On orders above ₹500" },
    { icon: Shield, title: "Quality Assured", desc: "100% fresh guarantee" },
    { icon: RefreshCcw, title: "Easy Returns", desc: "No questions asked" },
  ];

  return (
    <Layout>
      <section className="pt-28 pb-20">
        <div className="container-luxury px-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Image */}
            <div className="relative">
              <div className="glass-card overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover rounded-xl"
                />
              </div>

              {/* Badges */}
              <div className="absolute top-8 left-8 flex flex-col gap-2">
                {product.isOrganic && (
                  <span className="badge-organic text-sm">
                    <Leaf className="w-4 h-4" />
                    100% Organic
                  </span>
                )}
                {product.isFresh && (
                  <span className="badge-fresh text-sm">
                    <Check className="w-4 h-4" />
                    Farm Fresh
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              {/* Category */}
              <span className="text-sm font-medium text-primary uppercase tracking-wide mb-2">
                {product.category.replace("-", " ")}
              </span>

              {/* Name */}
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < Math.floor(product.rating)
                          ? "text-accent fill-accent"
                          : "text-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-primary">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="px-2 py-1 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-body text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Unit */}
              <div className="flex items-center gap-2 mb-8">
                <span className="text-sm text-muted-foreground">Unit:</span>
                <span className="px-3 py-1 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium">
                  {product.unit}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-medium text-foreground">
                  Quantity:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-lg font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stock */}
              <p className="text-sm text-muted-foreground mb-8">
                <span className="text-primary font-medium">{product.stock}</span>{" "}
                items in stock
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || isAdded}
                  className={cn(
                    "flex-1 min-w-[200px] flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all duration-300",
                    isAdded
                      ? "bg-primary text-primary-foreground"
                      : "btn-primary"
                  )}
                >
                  {isAdding ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
                <button className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-all duration-300">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="text-center p-4 rounded-xl bg-secondary/50"
                  >
                    <feature.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <h4 className="text-sm font-semibold text-foreground">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {filteredRelated.length > 0 && (
            <div>
              <h2 className="heading-section text-foreground mb-8">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredRelated.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
