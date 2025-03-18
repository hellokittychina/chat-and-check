
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  onChange?: (value: number) => void;
  className?: string;
}

export function Rating({
  value,
  max = 5,
  size = "md",
  onChange,
  className,
}: RatingProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };
  
  const starSize = sizeClasses[size];
  
  return (
    <div className={cn("flex items-center", className)}>
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          className={cn(
            "text-gray-300 hover:text-yellow-400 transition-colors focus:outline-none",
            {
              "text-yellow-400": star <= value,
              "cursor-pointer": !!onChange,
              "cursor-default": !onChange,
            }
          )}
          onClick={() => onChange?.(star)}
          disabled={!onChange}
          aria-label={`Rate ${star} out of ${max}`}
        >
          <Star
            className={cn(starSize, "fill-current", {
              "fill-yellow-400 text-yellow-400": star <= value,
            })}
          />
        </button>
      ))}
    </div>
  );
}
