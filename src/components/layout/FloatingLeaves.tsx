import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

interface LeafParticle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

export function FloatingLeaves() {
  const [leaves, setLeaves] = useState<LeafParticle[]>([]);

  useEffect(() => {
    const generatedLeaves: LeafParticle[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 16 + Math.random() * 16,
      duration: 12 + Math.random() * 8,
      delay: Math.random() * 10,
      rotation: Math.random() * 360,
    }));
    setLeaves(generatedLeaves);
  }, []);

  return (
    <div className="floating-leaves">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="floating-leaf"
          style={{
            left: `${leaf.left}%`,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
          }}
        >
          <Leaf
            style={{
              width: leaf.size,
              height: leaf.size,
              transform: `rotate(${leaf.rotation}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
