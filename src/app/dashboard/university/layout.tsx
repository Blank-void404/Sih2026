"use client";

import { useAuth } from "@/components/auth-provider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, Users, FolderKanban } from "lucide-react";

export default function UniversityDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && (!profile || profile.role !== "UNIVERSITY")) {
      // router.push("/"); 
    }
  }, [profile, isLoading, router]);

  const navItems = [
    { name: "Overview", href: "/dashboard/university", icon: LayoutDashboard },
    { name: "Active Projects", href: "/dashboard/university/projects", icon: FolderKanban },
    { name: "Teams & Mentors", href: "/dashboard/university/teams", icon: Users },
  ];

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-8 py-8">
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sticky top-24">
          <div className="mb-6 px-3">
            <h2 className="text-lg font-bold text-slate-800">University Portal</h2>
            <p className="text-sm text-slate-500">{profile?.organization_name || 'Institution'}</p>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
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
