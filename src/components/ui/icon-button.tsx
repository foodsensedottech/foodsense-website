import * as React from "react";
import { Icon, type IconName } from "@/lib/icons";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonProps {
  icon: IconName;
  label: string;
}

export function IconButton({
  icon,
  label,
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button className={cn("gap-2", className)} {...props}>
      <Icon name={icon} className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </Button>
  );
}
