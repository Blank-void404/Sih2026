"use client";

import Link from "next/link";
import { useAuth } from "./auth-provider";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export function Navbar() {
  const { profile, signIn, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const roles = ["CITIZEN", "UNIVERSITY", "INDUSTRY", "GOVERNMENT_ADMIN"];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
                JSIP
              </span>
              <span className="ml-2 text-sm font-medium text-slate-600 hidden sm:block">
                Jharkhand Societal Innovation
              </span>
            </Link>
          </div>
          
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link href="/" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
          <Link href="/explore" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Explore Challenges</Link>
          <Link href="/dashboard/citizen" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Citizen Dashboard</Link>
          <Link href="/dashboard/university" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">University Dashboard</Link>
          <Link href="/dashboard/industry" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">Industry Dashboard</Link>
          {/* Dark mode toggle */}
          <button onClick={() => {
            const html = document.documentElement;
            const isDark = html.dataset.theme === 'dark';
            html.dataset.theme = isDark ? 'light' : 'dark';
            html.classList.toggle('dark', !isDark);
          }} className="ml-4 p-2 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors" aria-label="Toggle dark mode">
            {typeof window !== 'undefined' && document.documentElement.dataset.theme === 'dark' ? '🌙' : '☀️'}
          </button>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-500 hover:text-slate-700 p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t border-slate-200 px-2 pt-2 pb-3 space-y-1">
          <Link href="/explore" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">
            Explore Challenges
          </Link>
          
          {!profile && (
            <div className="px-3 py-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Login Demo Roles</p>
              {roles.map(role => (
                <button
                  key={role}
                  onClick={() => {
                    signIn(role);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-base font-medium text-emerald-600"
                >
                  {role.replace('_', ' ')}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
