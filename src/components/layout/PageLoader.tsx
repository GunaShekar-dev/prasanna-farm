import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "loader-container transition-opacity duration-500",
        !isLoading && "opacity-0 pointer-events-none"
      )}
    >
      <div className="relative flex flex-col items-center">
        {/* Spinning Ring */}
        <div className="loader-ring" />
        
        {/* Animated Leaf */}
        <div className="loader-leaf">
          <Leaf className="w-12 h-12 text-primary" />
        </div>

        {/* Loading Text */}
        <p className="mt-8 text-primary font-display text-lg font-medium">
          Loading freshness...
        </p>
      </div>
    </div>
  );
}
