"use client";

import Link from "next/link";
import { useAuth } from "./auth-provider";
import { useState } from "react";
import { Menu, X, ChevronDown, LogOut, User, Search, Globe, Shield, Sparkles, FolderKanban, Compass, Building2, GraduationCap, Users } from "lucide-react";
import { LoginModal } from "./login-modal";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { profile, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDashDropdownOpen, setIsDashDropdownOpen] = useState(false);
  const [fontSize, setFontSize] = useState("normal");
  const [language, setLanguage] = useState("EN");
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
      {/* Top Utility Bar (Government & Language) */}
      <div className="bg-[#0B132B] text-slate-300 text-[11px] font-medium py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-200">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
              Government of India
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400">
              Digital India Initiative
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Accessibility / Font size switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
              <button 
                onClick={() => setFontSize("small")}
                className={`px-1 hover:text-white transition ${fontSize === 'small' ? 'text-amber-400 font-bold' : ''}`}
                title="Decrease Font Size"
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize("normal")}
                className={`px-1 hover:text-white transition ${fontSize === 'normal' ? 'text-amber-400 font-bold' : ''}`}
                title="Reset Font Size"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize("large")}
                className={`px-1 hover:text-white transition ${fontSize === 'large' ? 'text-amber-400 font-bold' : ''}`}
                title="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* Language Switcher */}
            <button 
              onClick={() => setLanguage(language === "EN" ? "HI" : "EN")}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-[11px] transition"
            >
              <Globe className="w-3 h-3 text-amber-400" />
              <span>{language === "EN" ? "English" : "हिन्दी"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <nav className="bg-[#FAF7F2] dark:bg-slate-900 border-b border-[#E5E0D4] dark:border-slate-800 sticky top-0 z-40 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* National Emblem & Portal Title */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-[#E0D8C8] dark:border-slate-700 flex items-center justify-center shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-[#0B132B] flex items-center justify-center text-amber-400 font-bold text-xs border border-amber-400/40">
                    🇮🇳
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none font-serif">
                      National Innovation Portal
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D9531E]"></span>
                    <span className="text-[11px] font-semibold text-[#D9531E] dark:text-amber-400 tracking-wide uppercase">
                      Jharkhand Innovation Network
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  pathname === "/"
                    ? "bg-[#EFE8DC] dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-[#DCD3C4]"
                    : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-[#F2ECE1]"
                }`}
              >
                Home
              </Link>

              <Link
                href="/projects"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  pathname.startsWith("/projects")
                    ? "bg-[#EFE8DC] text-[#D9531E] dark:bg-slate-800 dark:text-amber-400 border border-[#DCD3C4]"
                    : "text-slate-700 dark:text-slate-300 hover:text-[#D9531E] hover:bg-[#F2ECE1]"
                }`}
              >
                <FolderKanban className="w-3.5 h-3.5 text-[#D9531E]" />
                Active Projects
              </Link>

              <Link
                href="/explore"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  pathname === "/explore"
                    ? "bg-[#EFE8DC] text-[#D9531E] dark:bg-slate-800 dark:text-amber-400 border border-[#DCD3C4]"
                    : "text-slate-700 dark:text-slate-300 hover:text-[#D9531E] hover:bg-[#F2ECE1]"
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-[#D9531E]" />
                Explore Challenges
              </Link>

              {/* Dashboards Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDashDropdownOpen(!isDashDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsDashDropdownOpen(false), 250)}
                  className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:bg-[#F2ECE1] transition-colors"
                  aria-expanded={isDashDropdownOpen}
                >
                  Dashboards
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isDashDropdownOpen && (
                  <div 
                    onMouseDown={(e) => e.preventDefault()}
                    className="absolute right-0 mt-1 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <Link
                      href="/dashboard/citizen"
                      onClick={() => setIsDashDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-[#FAF7F2] hover:text-[#D9531E] transition-colors"
                    >
                      <Users className="w-3.5 h-3.5 text-slate-500" /> Citizen Portal
                    </Link>
                    <Link
                      href="/dashboard/university"
                      onClick={() => setIsDashDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-[#FAF7F2] hover:text-[#D9531E] transition-colors"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-slate-500" /> University Portal
                    </Link>
                    <Link
                      href="/dashboard/industry"
                      onClick={() => setIsDashDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-[#FAF7F2] hover:text-[#D9531E] transition-colors"
                    >
                      <Building2 className="w-3.5 h-3.5 text-slate-500" /> Industrial & CSR Portal
                    </Link>
                    <Link
                      href="/dashboard/admin"
                      onClick={() => setIsDashDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-[#FAF7F2] hover:text-[#D9531E] transition-colors"
                    >
                      <Shield className="w-3.5 h-3.5 text-slate-500" /> State Admin Portal
                    </Link>
                  </div>
                )}
              </div>

              {/* Search button icon */}
              <button 
                onClick={() => window.location.href = "/explore"}
                className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-[#EFE8DC] transition-colors"
                title="Search Portal"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Auth / Profile Button */}
              {profile ? (
                <div className="flex items-center gap-2 pl-2 border-l border-[#E5E0D4] dark:border-slate-800">
                  <Link
                    href={getDashboardUrl()}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-[#E5E0D4] shadow-sm hover:border-[#D9531E] transition"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#D9531E] text-white flex items-center justify-center text-[10px] font-bold">
                      {profile.full_name?.charAt(0) || "U"}
                    </div>
                    <div className="text-left leading-none">
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate max-w-[110px]">
                        {profile.full_name}
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={() => signOut()}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 pl-2">
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B132B] hover:bg-slate-800 text-white text-xs font-bold shadow-sm border border-slate-700 transition"
                  >
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    Sign In / Register
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden gap-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-700 hover:text-slate-900 p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2] dark:bg-slate-900 border-t border-[#E5E0D4] px-4 pt-3 pb-5 space-y-2">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-[#EFE8DC]"
            >
              Home
            </Link>
            <Link
              href="/projects"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-[#D9531E] hover:bg-[#EFE8DC]"
            >
              Active Projects
            </Link>
            <Link
              href="/explore"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-[#EFE8DC]"
            >
              Explore Challenges
            </Link>
            <div className="pt-2 border-t border-[#E5E0D4]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
                Dashboards
              </span>
              <div className="grid grid-cols-2 gap-1.5 mt-1">
                <Link
                  href="/dashboard/citizen"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-800 bg-white border border-[#E5E0D4]"
                >
                  Citizen
                </Link>
                <Link
                  href="/dashboard/university"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-800 bg-white border border-[#E5E0D4]"
                >
                  University
                </Link>
                <Link
                  href="/dashboard/industry"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-800 bg-white border border-[#E5E0D4]"
                >
                  Industry
                </Link>
                <Link
                  href="/dashboard/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-800 bg-white border border-[#E5E0D4]"
                >
                  Gov Admin
                </Link>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E0D4]">
              {profile ? (
                <div className="flex items-center justify-between px-3 py-2 bg-white rounded-xl border border-[#E5E0D4]">
                  <div>
                    <div className="text-xs font-bold text-slate-900">{profile.full_name}</div>
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
                  className="w-full py-2.5 rounded-xl bg-[#0B132B] text-white font-bold text-xs text-center border border-slate-700"
                >
                  Sign In / Register
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
