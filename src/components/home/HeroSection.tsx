import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, Leaf, Clock } from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";

export function HeroSection() {
  const features = [
    { icon: Leaf, label: "100% Organic" },
    { icon: Truck, label: "Free Delivery" },
    { icon: Shield, label: "Quality Assured" },
    { icon: Clock, label: "Same Day" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Prasanna Farm"
          className="w-full h-full object-cover"
        />
        <div className="hero-gradient-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="container-luxury relative z-10 px-4 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-card">
              Certified Organic Farm
            </span>
          </div>

          {/* Heading */}
          <h1 
            className="heading-hero text-card mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Fresh From{" "}
            <span className="relative inline-block">
              <span className="relative z-10 gradient-text-gold">Farm</span>
            </span>
            {" "}to Your Home
          </h1>

          {/* Subheading */}
          <p 
            className="text-body text-card/90 mb-10 max-w-xl leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Experience the taste of nature with our handpicked, organic produce. 
            Grown with love in the heart of India, delivered fresh to your doorstep.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-wrap gap-4 mb-16 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Link to="/products" className="btn-primary">
              Shop Fresh Produce
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/about" className="btn-glass text-card">
              Our Story
            </Link>
          </div>

          {/* Features */}
          <div 
            className="flex flex-wrap gap-6 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            {features.map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-2 text-card/90"
              >
                <div className="w-10 h-10 rounded-full bg-card/10 backdrop-blur-sm flex items-center justify-center">
                  <feature.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in">
        <span className="text-card/60 text-xs uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-card/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 rounded-full bg-card animate-bounce" />
        </div>
      </div>
    </section>
  );
}
