import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function CTASection() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container-luxury px-4">
        <div className="reveal relative overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-16">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />

          {/* Floating Leaves */}
          <Leaf className="absolute top-10 right-10 w-16 h-16 text-primary-foreground/10 rotate-45 animate-float" />
          <Leaf className="absolute bottom-10 left-10 w-12 h-12 text-primary-foreground/10 -rotate-12 animate-float-slow" />

          {/* Content */}
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Experience Fresh Farm Goodness?
            </h2>
            <p className="text-body text-primary-foreground/80 mb-10">
              Join thousands of happy families enjoying organic, farm-fresh produce 
              delivered straight to their doorstep.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/products" className="btn-gold">
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/about" className="btn-glass text-primary-foreground border-primary-foreground/30">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
