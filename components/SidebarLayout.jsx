"use client";

import { useState } from "react";
import { Menu, LayoutDashboard, User, Key } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function SidebarLayout({ user, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); // current route

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      router.push("/admin-login");
    }
  };

  const getButtonClasses = (path) =>
    `flex items-center w-full p-3 rounded-lg transition ${
      pathname === path ? "bg-green-900 hover:bg-green-900" : "hover:bg-green-800"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-green-700 via-green-600 to-yellow-500 text-white shadow-lg transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-center p-4 border-b border-green-500">
          {sidebarOpen && (
            <span className="text-lg font-bold tracking-wide">Visit Nakuru</span>
          )}
        </div>

        <nav className="flex-1 p-3 space-y-2">
          <button onClick={() => router.push("/admin")} className={getButtonClasses("/admin")}>
            <LayoutDashboard size={20} />
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </button>

          <button onClick={() => router.push("/admin/profile")} className={getButtonClasses("/admin/profile")}>
            <User size={20} />
            {sidebarOpen && <span className="ml-3">Profile</span>}
          </button>

          <button onClick={() => router.push("/admin/change-password")} className={getButtonClasses("/admin/change-password")}>
            <Key size={20} />
            {sidebarOpen && <span className="ml-3">Change Password</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center bg-white shadow p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Hello, {user.username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-green-700 via-green-600 to-yellow-400 text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50">{children}</main>

        <footer className="bg-gray-800 text-white text-center p-3 text-sm">
          © 2025 Admin Portal. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
