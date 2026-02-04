import { categories } from "@/lib/data";
import { CategoryCard } from "@/components/products/CategoryCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function CategoriesSection() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-nature">
      <div className="container-luxury px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            Our Categories
          </span>
          <h2 className="heading-section text-foreground mb-4">
            Explore Fresh Farm Goodness
          </h2>
          <p className="text-body text-muted-foreground">
            From crisp vegetables to juicy fruits, discover our carefully curated selection 
            of organic farm produce.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
