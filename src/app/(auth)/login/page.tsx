"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("admin");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("ashish@school.edu");
  const [password, setPassword] = useState("password123");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>

        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <GraduationCap className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">School ERP Portal</h1>
          <p className="text-slate-500 mt-2 text-sm">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 bg-white"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 bg-white"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Login As
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 bg-white"
            >
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm mt-4 flex justify-center items-center"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          <p>Mock login - selects role and redirects</p>
        </div>
      </div>
    </div>
  );
}
