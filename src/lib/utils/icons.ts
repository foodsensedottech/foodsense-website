import * as Icons from 'lucide-react';

export function getLucideIcon(iconName: AboutCard['lucideIconList']): Icons.LucideIcon {
  return Icons[iconName as keyof typeof Icons] as Icons.LucideIcon;
} 