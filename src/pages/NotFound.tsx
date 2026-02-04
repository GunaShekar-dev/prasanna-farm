import { Link } from "react-router-dom";
import { Home, ArrowLeft, Leaf } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-nature px-4">
      <div className="text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-12">
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-display font-bold text-foreground">
            Prasanna<span className="text-primary">Farm</span>
          </span>
        </Link>

        <h1 className="text-8xl font-display font-bold text-primary/20 mb-4">404</h1>
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Oops! This page wandered off the farm. Let's get you back to fresh produce.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link to="/products" className="btn-outline">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
