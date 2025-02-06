export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN'
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export interface AdminUser {
  id: string;
  email: string;
  role: Role;
  name: string;
}

// For development, we'll use a hardcoded super admin
export const SUPER_ADMIN: AdminUser = {
  id: '1',
  email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@foodsense.tech',
  role: ROLES.SUPER_ADMIN,
  name: 'Super Admin'
}; 