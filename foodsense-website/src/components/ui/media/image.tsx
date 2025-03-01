"use client";

import NextImage from "next/image";
import { cn } from "@/lib/utils";
import type { ImageProps } from "next/image";

interface CustomImageProps extends Omit<ImageProps, "className"> {
  wrapperClassName?: string;
  imageClassName?: string;
  fill?: boolean;
}

export function CustomImage({
  src,
  alt,
  width,
  height,
  wrapperClassName,
  imageClassName,
  fill,
  ...props
}: CustomImageProps) {
  const wrapperStyles = fill
    ? { position: "relative" as const, width: "100%", height: "100%" }
    : width && height
    ? {
        position: "relative" as const,
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }
    : undefined;

  return (
    <div className={cn("relative", wrapperClassName)} style={wrapperStyles}>
      <NextImage
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        className={cn(
          "transition-all duration-300",
          fill && "object-cover",
          imageClassName
        )}
        {...props}
      />
    </div>
  );
}

export { CustomImage as Image };
