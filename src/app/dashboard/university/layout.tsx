"use client";

import { useAuth } from "@/components/auth-provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FolderKanban, ArrowLeft, GraduationCap } from "lucide-react";

export default function UniversityDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, signIn } = useAuth();
  const pathname = usePathname();

  const isUniRole = profile?.role === "UNIVERSITY";
  const orgName = isUniRole && profile?.organization_name
    ? profile.organization_name
    : "Birsa Institute of Technology (BIT) Mesra";

  const navItems = [
    { name: "Overview & Challenges", href: "/dashboard/university", icon: LayoutDashboard },
    { name: "Active Projects", href: "/dashboard/university/projects", icon: FolderKanban },
    { name: "Teams & Mentors", href: "/dashboard/university/teams", icon: Users },
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
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-700 dark:text-blue-300">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  University Portal
                </h2>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">Academic & Research</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {orgName}
            </p>

            {!isUniRole && (
              <button
                type="button"
                onClick={() => signIn("UNIVERSITY")}
                className="mt-2.5 w-full py-1 px-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[10px] font-bold text-center hover:bg-blue-100 transition"
              >
                + Switch to University Session
              </button>
            )}
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = item.href === "/dashboard/university"
                ? pathname === "/dashboard/university"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900"
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}
