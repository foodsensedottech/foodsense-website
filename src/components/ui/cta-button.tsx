"use client";

import { Button } from "@/components/ui/button";
import { analytics } from "@/lib/analytics/tracking";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CTAButtonProps {
  href: string;
  text: string;
  id: string;
  variant?: "default" | "secondary" | "outline";
  className?: string;
  isExternal?: boolean;
}

export function CTAButton({
  href,
  text,
  id,
  variant = "default",
  className,
  isExternal = false,
}: CTAButtonProps) {
  const handleClick = () => {
    analytics.trackCTAClick(id, text);

    if (isExternal) {
      analytics.trackExternalLink(href, text);
    }
  };

  const buttonContent = (
    <Button
      variant={variant}
      className={cn("font-semibold", className)}
      onClick={handleClick}
    >
      {text}
    </Button>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        {buttonContent}
      </a>
    );
  }

  return <Link href={href}>{buttonContent}</Link>;
}
