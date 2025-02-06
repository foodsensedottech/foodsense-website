"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { ROLES, type Role } from "@/lib/auth/roles";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: Role;
}

export function ProtectedRoute({ 
  children, 
  requiredRole = ROLES.SUPER_ADMIN 
}: ProtectedRouteProps) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/admin/login");
    } else if (user.role !== requiredRole) {
      router.push("/admin/unauthorized");
    }
  }, [user, requiredRole, router]);

  if (!user || user.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
} 