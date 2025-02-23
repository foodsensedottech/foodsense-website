import { Icon } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export function LoadingSpinner({ 
  size = "md", 
  className 
}: LoadingSpinnerProps) {
  return (
    <Icon
      name="spinner"
      className={cn(
        "animate-spin text-muted-foreground",
        sizes[size],
        className
      )}
    />
  );
} 