"use client";

import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="w-12 h-12 text-emerald-400" />
      </div>
      <h1 className="text-6xl font-extrabold text-slate-800 mb-3">404</h1>
      <h2 className="text-2xl font-bold text-slate-700 mb-4">Page Not Found</h2>
      <p className="text-slate-500 max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full transition-colors shadow-md"
      >
        <Home className="w-4 h-4" />
        Back to Home
      </Link>
    </section>
  );
}
