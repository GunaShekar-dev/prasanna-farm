import { Link } from "react-router-dom";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

export default function OrderSuccessPage() {
  const orderId = `PF${Date.now().toString().slice(-8)}`;

  return (
    <Layout>
      <section className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4">
          {/* Success Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto animate-scale-in">
              <CheckCircle className="w-12 h-12 text-primary" />
            </div>
            <div className="absolute inset-0 w-24 h-24 rounded-full bg-primary/20 mx-auto animate-ping" />
          </div>

          {/* Message */}
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in">
            Order Placed Successfully!
          </h1>
          <p className="text-body text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Thank you for your order. We're preparing your fresh farm produce with love.
          </p>

          {/* Order Details */}
          <div className="glass-card text-left mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-6 h-6 text-primary" />
              <span className="font-semibold text-foreground">Order Details</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-medium text-foreground">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Delivery</span>
                <span className="font-medium text-primary">Tomorrow by 6 PM</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/products" className="btn-primary">
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/" className="btn-outline">
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
