import { Star, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The vegetables are incredibly fresh! You can taste the difference. My family loves the organic tomatoes.",
    avatar: "PS",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi",
    rating: 5,
    text: "Best quality organic produce I've ever ordered online. The delivery is always on time and packaging is excellent.",
    avatar: "RK",
  },
  {
    id: 3,
    name: "Anita Patel",
    location: "Bangalore",
    rating: 5,
    text: "The Alphonso mangoes were heavenly! Definitely ordering more. Great service and premium quality.",
    avatar: "AP",
  },
];

export function TestimonialsSection() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="section-padding bg-secondary/30">
      <div className="container-luxury px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Testimonials
          </span>
          <h2 className="heading-section text-foreground mb-4">
            Loved by Thousands
          </h2>
          <p className="text-body text-muted-foreground">
            Don't just take our word for it. Here's what our happy customers have to say.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="glass-card relative group hover:-translate-y-2 transition-transform duration-500"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
