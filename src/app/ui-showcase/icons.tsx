"use client";

import * as React from "react";
import { Icons, Icon, type IconName } from "@/lib/icons";

export function IconShowcase() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Object.keys(Icons).map((name) => (
        <div
          key={name}
          className="flex flex-col items-center justify-center p-4 border rounded"
        >
          <Icon name={name as IconName} className="h-6 w-6 mb-2" />
          <span className="text-sm text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  );
} 