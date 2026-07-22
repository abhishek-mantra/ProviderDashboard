import { Skeleton } from "./skeleton";
import { cn } from "./utils";

interface SkeletonListProps {
  count?: number;
  height?: string;
  className?: string;
  variant?: "card" | "row" | "table";
}

export function SkeletonList({ count = 6, height = "h-20", className, variant = "card" }: SkeletonListProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "rounded-lg",
            variant === "card" && `w-full ${height}`,
            variant === "row" && "w-full h-12",
            variant === "table" && (i === 0 ? "w-full h-10" : `w-full ${height}`)
          )}
        />
      ))}
    </div>
  );
}
