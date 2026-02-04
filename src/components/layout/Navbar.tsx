import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, User, Leaf, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "glass-navbar py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-luxury flex items-center justify-between px-4">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">
            Prasanna<span className="text-primary">Farm</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "relative font-medium text-sm transition-colors duration-300",
                isActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
                "after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300",
                isActive(link.href) && "after:scale-x-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-xl glass hover:bg-primary/5 transition-all duration-300">
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <Link
            to="/cart"
            className="p-2.5 rounded-xl glass hover:bg-primary/5 transition-all duration-300 relative"
          >
            <ShoppingCart className="w-5 h-5 text-muted-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center animate-scale-in">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            to="/login"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl glass hover:bg-primary/5 transition-all duration-300"
          >
            <User className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Login</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-xl glass"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 glass border-t border-border/50 transition-all duration-500 overflow-hidden",
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container-luxury py-4 space-y-2 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block px-4 py-3 rounded-xl transition-all duration-300",
                isActive(link.href)
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-foreground hover:bg-muted transition-all duration-300"
          >
            <User className="w-5 h-5" />
            <span>Login / Sign Up</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
