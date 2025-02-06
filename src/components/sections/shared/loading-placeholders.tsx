import { cn } from "@/lib/utils";

interface LoadingPlaceholderProps {
  height: string;
}

export function LoadingPlaceholder({ height }: LoadingPlaceholderProps) {
  return (
    <div 
      className={cn(
        "w-full animate-pulse bg-gray-100 dark:bg-gray-800",
        "rounded-lg transition-all"
      )} 
      style={{ height }}
    />
  );
}

export const LoadingPlaceholders = {
  About: () => (
    <div className="min-h-[600px] animate-pulse bg-gray-100 dark:bg-gray-800" />
  ),
  Services: () => (
    <div className="min-h-[800px] animate-pulse bg-gray-100 dark:bg-gray-800" />
  ),
  Loyalty: () => (
    <div className="min-h-[700px] animate-pulse bg-gray-100 dark:bg-gray-800" />
  ),
  Contact: () => (
    <div className="min-h-[900px] animate-pulse bg-gray-100 dark:bg-gray-800" />
  )
}; 