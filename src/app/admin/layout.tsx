import { AuthProvider } from "@/components/providers/auth-provider";
import { WebSocketProvider } from "@/components/providers/websocket-provider";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if we're on the login page
  const isLoginPage = typeof window !== 'undefined' && window.location.pathname === '/admin/login';

  // Only wrap with ProtectedRoute if not on login page
  const content = isLoginPage ? children : (
    <ProtectedRoute>
      <WebSocketProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="flex">
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
              <AdminSidebar />
            </aside>
            <main className="flex-1 p-8">
              {children}
            </main>
          </div>
        </div>
      </WebSocketProvider>
    </ProtectedRoute>
  );

  return (
    <AuthProvider>
      {content}
    </AuthProvider>
  );
} 