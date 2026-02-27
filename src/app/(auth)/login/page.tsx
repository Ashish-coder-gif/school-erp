"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GraduationCap, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(error || "");
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMsg("Invalid email or password. Please try again.");
      } else if (result?.ok) {
        const response = await fetch("/api/auth/session");
        const session = await response.json();
        
        if (session?.user?.role) {
          const role = session.user.role.toLowerCase();
          router.push(`/${role}`);
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      setErrorMsg("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">School ERP</h1>
              <p className="text-xs text-gray-500">Management Portal</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600 transition">About</a>
            <a href="#" className="hover:text-blue-600 transition">Contact</a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Gradient Top Bar */}
            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

            {/* Card Content */}
            <div className="p-8 md:p-10">
              {/* Title */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600 text-sm">Sign in to your account to continue</p>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{errorMsg}</p>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="you@school.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 bg-white disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 bg-white disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-700">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                    Remember me
                  </label>
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Forgot password?
                  </a>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Sign In
                    </>
                  )}
                </button>
              </form>

              {/* Demo Access */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-gray-900">Demo Access</p>
                  <button
                    type="button"
                    onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {showDemoCredentials ? "Hide" : "Show"} Credentials
                  </button>
                </div>

                {showDemoCredentials && (
                  <div className="space-y-2">
                    {[
                      { role: "Admin", email: "admin@school.com", password: "admin123" },
                      { role: "Teacher", email: "teacher1@school.com", password: "teacher123" },
                      { role: "Student", email: "student1@school.com", password: "student123" },
                      { role: "Parent", email: "parent1@school.com", password: "parent123" },
                    ].map((demo) => (
                      <button
                        key={demo.email}
                        type="button"
                        onClick={() => quickLogin(demo.email, demo.password)}
                        className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-all text-left text-sm"
                      >
                        <p className="font-semibold text-gray-900">{demo.role}</p>
                        <p className="text-xs text-gray-600">{demo.email}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            By signing in, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Terms of Service
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <p className="text-center text-sm text-gray-600">
            © 2026 School ERP Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

