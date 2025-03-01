import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
}

export function Skeleton({
  className,
  isLoading = true,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        isLoading ? "relative z-0" : "hidden",
        className
      )}
      {...props}
    />
  );
}
