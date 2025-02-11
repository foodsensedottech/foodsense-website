import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export function getLucideIcon(iconText: string): LucideIcon | null {
  // Extract icon name from format #icon-name
  const match = iconText.match(/#([\w-]+)/);
  if (!match) return null;

  const iconName = match[1];
  // Convert kebab-case to PascalCase (e.g., "user-cog" to "UserCog")
  const pascalCase = iconName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  return (LucideIcons as Record<string, LucideIcon>)[pascalCase] || null;
} 