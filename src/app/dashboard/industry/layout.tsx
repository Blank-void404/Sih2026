"use client";

import { useAuth } from "@/components/auth-provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Handshake, Sparkles, Users, TrendingUp, ArrowLeft } from "lucide-react";

export default function IndustryDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, signIn } = useAuth();
  const pathname = usePathname();

  const isIndRole = profile?.role === "INDUSTRY";
  const orgName = isIndRole && profile?.organization_name
    ? profile.organization_name
    : "Tata Steel CSR Foundation";

  const navItems = [
    { name: "Overview & Partnerships", tab: "supported", icon: Handshake },
    { name: "Recommended Challenges", tab: "recommended", icon: Sparkles },
    { name: "Mentorship Requests", tab: "mentorship", icon: Users },
    { name: "Statewide CSR Analytics", tab: "analytics", icon: TrendingUp },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 py-6">
      <aside className="w-full lg:w-64 shrink-0">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 sticky top-24 space-y-5">
          <div className="px-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors mb-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Portals Hub
            </Link>

            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-700 dark:text-purple-300">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  Industrial Portal
                </h2>
                <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400">Corporate CSR & Grants</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {orgName}
            </p>

            {!isIndRole && (
              <button
                type="button"
                onClick={() => signIn("INDUSTRY")}
                className="mt-2.5 w-full py-1 px-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-[10px] font-bold text-center hover:bg-purple-100 transition"
              >
                + Switch to Industry Session
              </button>
            )}
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={`#${item.tab}`}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 transition-all"
              >
                <item.icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}
