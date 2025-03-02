"use client";

import * as React from "react";
import { iconMap } from "@/lib/icons/ui-icons";
import type { IconName } from "@/lib/icons/types";

export function IconShowcase() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Object.entries(iconMap).map(([name, Icon]) => (
        <div
          key={name}
          className="flex flex-col items-center justify-center p-4 border rounded"
        >
          <Icon className="h-6 w-6 mb-2" />
          <span className="text-sm text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  );
}
