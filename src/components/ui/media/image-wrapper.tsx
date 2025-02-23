import { cn } from "@/lib/utils";

interface ImageWrapperProps {
  className?: string;
  children: React.ReactNode;
}

export function ImageWrapper({ className, children }: ImageWrapperProps) {
  return <div className={cn("relative", className)}>{children}</div>;
}
