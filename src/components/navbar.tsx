"use client";

import Link from "next/link";
import { useAuth } from "./auth-provider";
import { useState } from "react";
import { Menu, X, ChevronDown, LogOut, User, Sparkles, FolderKanban, Compass, ShieldCheck } from "lucide-react";
import { LoginModal } from "./login-modal";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { profile, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDashDropdownOpen, setIsDashDropdownOpen] = useState(false);
  const pathname = usePathname();

  const getDashboardUrl = () => {
    if (!profile) return "/dashboard";
    switch (profile.role) {
      case "CITIZEN":
        return "/dashboard/citizen";
      case "UNIVERSITY":
        return "/dashboard/university";
      case "INDUSTRY":
        return "/dashboard/industry";
      case "GOVERNMENT_ADMIN":
        return "/dashboard/admin";
      default:
        return "/dashboard";
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "CITIZEN":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
      case "UNIVERSITY":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300";
      case "INDUSTRY":
        return "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300";
      case "GOVERNMENT_ADMIN":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <>
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 backdrop-blur-md bg-white/95 dark:bg-slate-900/95 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-emerald-600/20">
                  J
                </div>
                <div>
                  <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 tracking-tight">
                    JSIP
                  </span>
                  <span className="hidden sm:inline-block ml-2 text-xs font-semibold text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700 pl-2">
                    Jharkhand Societal Innovation Portal
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  pathname === "/"
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                Home
              </Link>

              <Link
                href="/projects"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  pathname.startsWith("/projects")
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                <FolderKanban className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Active Projects
              </Link>

              <Link
                href="/explore"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  pathname === "/explore"
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                Explore Challenges
              </Link>

              {/* Dashboards Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDashDropdownOpen(!isDashDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsDashDropdownOpen(false), 200)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  Dashboards
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isDashDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-52 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <Link
                      href="/dashboard/citizen"
                      className="block px-3.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-700"
                    >
                      👥 Citizen Dashboard
                    </Link>
                    <Link
                      href="/dashboard/university"
                      className="block px-3.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-700"
                    >
                      🎓 University Dashboard
                    </Link>
                    <Link
                      href="/dashboard/industry"
                      className="block px-3.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-700"
                    >
                      🏭 Industry Dashboard
                    </Link>
                    <Link
                      href="/dashboard/admin"
                      className="block px-3.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-700"
                    >
                      🏛️ Government Admin Portal
                    </Link>
                    <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>
                    <Link
                      href="/dashboard"
                      className="block px-3.5 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800"
                    >
                      View All Dashboards &rarr;
                    </Link>
                  </div>
                )}
              </div>

              {/* Dark mode toggle */}
              <button
                onClick={() => {
                  const html = document.documentElement;
                  const isDark = html.dataset.theme === "dark" || html.classList.contains("dark");
                  html.dataset.theme = isDark ? "light" : "dark";
                  html.classList.toggle("dark", !isDark);
                }}
                className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle dark mode"
                title="Toggle Theme"
              >
                🌓
              </button>

              {/* Auth / Profile Area */}
              {profile ? (
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                  <Link
                    href={getDashboardUrl()}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                      {profile.full_name?.charAt(0) || "U"}
                    </div>
                    <div className="text-left leading-none">
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate max-w-[110px]">
                        {profile.full_name}
                      </div>
                      <span className={`inline-block text-[9px] font-semibold px-1 py-0.5 rounded mt-0.5 ${getRoleBadge(profile.role)}`}>
                        {profile.role.replace("_", " ")}
                      </span>
                    </div>
                  </Link>

                  <button
                    onClick={() => signOut()}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 pl-2">
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition"
                  >
                    <User className="w-3.5 h-3.5" />
                    Demo Sign In
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden gap-2">
              <button
                onClick={() => {
                  const html = document.documentElement;
                  const isDark = html.dataset.theme === "dark" || html.classList.contains("dark");
                  html.dataset.theme = isDark ? "light" : "dark";
                  html.classList.toggle("dark", !isDark);
                }}
                className="p-1.5 text-slate-500 rounded-lg"
              >
                🌓
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-5 space-y-2">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Home
            </Link>
            <Link
              href="/projects"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800"
            >
              Active Projects
            </Link>
            <Link
              href="/explore"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Explore Challenges
            </Link>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
                Dashboards
              </span>
              <div className="grid grid-cols-2 gap-1.5 mt-1">
                <Link
                  href="/dashboard/citizen"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800"
                >
                  Citizen
                </Link>
                <Link
                  href="/dashboard/university"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800"
                >
                  University
                </Link>
                <Link
                  href="/dashboard/industry"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800"
                >
                  Industry
                </Link>
                <Link
                  href="/dashboard/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800"
                >
                  Gov Admin
                </Link>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              {profile ? (
                <div className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {profile.full_name}
                    </div>
                    <div className="text-[10px] text-slate-500">{profile.email}</div>
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-xs text-rose-600 font-semibold"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs text-center"
                >
                  Demo Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
