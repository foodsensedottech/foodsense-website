"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      router.push("/admin");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "appearance-none rounded-none relative block w-full px-3 py-2",
                  "border border-gray-300 dark:border-gray-700",
                  "placeholder-gray-500 dark:placeholder-gray-400",
                  "text-gray-900 dark:text-white",
                  "rounded-t-md",
                  "focus:outline-none focus:ring-primary focus:border-primary focus:z-10",
                  "bg-white dark:bg-gray-800"
                )}
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(
                  "appearance-none rounded-none relative block w-full px-3 py-2",
                  "border border-gray-300 dark:border-gray-700",
                  "placeholder-gray-500 dark:placeholder-gray-400",
                  "text-gray-900 dark:text-white",
                  "rounded-b-md",
                  "focus:outline-none focus:ring-primary focus:border-primary focus:z-10",
                  "bg-white dark:bg-gray-800"
                )}
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "group relative w-full flex justify-center py-2 px-4",
                "border border-transparent text-sm font-medium rounded-md",
                "text-secondary bg-primary hover:bg-primary/90",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                "transition-colors duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 