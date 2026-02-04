import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Users, Award, Heart, MapPin } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import farmerImage from "@/assets/farmer.jpg";
import heroImage from "@/assets/hero-farm.jpg";

const timeline = [
  {
    year: "1985",
    title: "The Beginning",
    description:
      "Started as a small family farm with just 2 acres of land and a dream to grow organic vegetables.",
  },
  {
    year: "1995",
    title: "Going Organic",
    description:
      "Made the decision to go fully organic, eliminating all pesticides and chemical fertilizers.",
  },
  {
    year: "2010",
    title: "Community Growth",
    description:
      "Expanded to 50 acres and started supplying to local markets and restaurants.",
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description:
      "Launched online ordering to bring fresh farm produce directly to homes across India.",
  },
  {
    year: "2024",
    title: "Today",
    description:
      "Now serving 10,000+ happy families with daily fresh deliveries from our 100-acre organic farm.",
  },
];

const values = [
  {
    icon: Leaf,
    title: "100% Organic",
    description: "No pesticides, no chemicals. Just pure, natural farming the way nature intended.",
  },
  {
    icon: Heart,
    title: "Grown with Love",
    description: "Every vegetable and fruit is nurtured with care by our dedicated farming family.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Supporting local farmers and communities while bringing you the best produce.",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "Certified organic with rigorous quality checks at every step of the journey.",
  },
];

export default function AboutPage() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={farmerImage}
            alt="Our Farm"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
        </div>

        <div className="container-luxury relative z-10 px-4 pt-32 pb-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-card text-sm font-medium mb-6 animate-fade-in">
              <Leaf className="w-4 h-4" />
              Our Story
            </span>
            <h1 className="heading-hero text-card mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              From Our Farm to Your Family
            </h1>
            <p className="text-body text-card/80 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              For over three decades, Prasanna Farm has been committed to growing the 
              freshest organic produce while nurturing the land for future generations.
            </p>
            <div className="flex gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link to="/products" className="btn-gold">
                Shop Fresh
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={sectionRef} className="section-padding bg-gradient-nature">
        <div className="container-luxury px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Our Values
            </span>
            <h2 className="heading-section text-foreground mb-4">
              What We Stand For
            </h2>
            <p className="text-body text-muted-foreground">
              These core principles guide everything we do, from seed to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {values.map((value) => (
              <div
                key={value.title}
                className="glass-card text-center group hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  <value.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="container-luxury px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
              Our Journey
            </span>
            <h2 className="heading-section text-foreground mb-4">
              Growing Together Since 1985
            </h2>
          </div>

          <div className="relative">
            {/* Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 z-10" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${
                      index % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8"
                    }`}
                  >
                    <div className="glass-card reveal">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-primary/10 text-primary mb-3">
                        {item.year}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Farm Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Our Farm"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>

        <div className="container-luxury relative z-10 px-4">
          <div className="max-w-3xl mx-auto text-center reveal">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-5xl font-bold text-card mb-6">
              Visit Our Farm
            </h2>
            <p className="text-body text-card/80 mb-8">
              Experience the beauty of organic farming firsthand. Walk through our fields, 
              meet our farmers, and see where your food comes from.
            </p>
            <div className="glass-card inline-block">
              <p className="text-card font-medium">
                Prasanna Farm, Village Road<br />
                Maharashtra, India 400001
              </p>
              <p className="text-card/60 text-sm mt-2">
                Open for visits: Saturday & Sunday, 9 AM - 5 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-luxury px-4">
          <div className="glass-card text-center max-w-2xl mx-auto reveal">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Taste the Difference?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join our family of happy customers enjoying fresh, organic produce every day.
            </p>
            <Link to="/products" className="btn-primary">
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
