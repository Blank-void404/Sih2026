"use client";

import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/components/auth-provider";
import { Users, GraduationCap, Building2, Shield, Rocket, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

interface DashboardCard {
  name: string;
  portalTitle: string;
  role?: UserRole;
  href: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
  badgeColor: string;
  borderColor: string;
  accentColor: string;
  orgName?: string;
  persona?: string;
}

export function DashboardHubClient() {
  const { profile, signIn } = useAuth();
  const router = useRouter();

  const dashboards: DashboardCard[] = [
    {
      name: "Citizen",
      portalTitle: "Citizen Civic Portal",
      role: "CITIZEN",
      href: "/dashboard/citizen",
      description: "Report local water, infrastructure, and environmental challenges across Jharkhand and track resolution in real time.",
      icon: <Users className="w-7 h-7 text-emerald-600" />,
      badge: "Grassroots Citizens & SHGs",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
      borderColor: "hover:border-emerald-500",
      accentColor: "text-emerald-600",
      orgName: "Ranchi Citizens Action Forum",
      persona: "Ramesh Mahto (Citizen Representative)",
    },
    {
      name: "University",
      portalTitle: "University Research Portal",
      role: "UNIVERSITY",
      href: "/dashboard/university",
      description: "Academic research laboratories, faculty challenge adoptions, student multidisciplinary cohorts, and milestone tracking.",
      icon: <GraduationCap className="w-7 h-7 text-blue-600" />,
      badge: "Higher Ed & Engineering Labs",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
      borderColor: "hover:border-blue-500",
      accentColor: "text-blue-600",
      orgName: "Birsa Institute of Technology (BIT) Mesra",
      persona: "Dr. Anjali Mehta (Research Lead)",
    },
    {
      name: "Industry",
      portalTitle: "Industrial & CSR Portal",
      role: "INDUSTRY",
      href: "/dashboard/industry",
      description: "Corporate CSR sponsors, technical mentoring boards, capital grant commitments, and real-world industrial testing.",
      icon: <Building2 className="w-7 h-7 text-purple-600" />,
      badge: "Corporate & CSR Foundations",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800",
      borderColor: "hover:border-purple-500",
      accentColor: "text-purple-600",
      orgName: "Tata Steel CSR Foundation",
      persona: "Dr. Vivek Chhabra (CSR VP)",
    },
    {
      name: "Government Admin",
      portalTitle: "Statewide Governance Portal",
      role: "GOVERNMENT_ADMIN",
      href: "/dashboard/admin",
      description: "Apex governance oversight across Jharkhand’s 24 districts, Schedule VII compliance, and statewide innovation density analytics.",
      icon: <Shield className="w-7 h-7 text-amber-600" />,
      badge: "Govt. of Jharkhand Apex",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
      borderColor: "hover:border-amber-500",
      accentColor: "text-amber-600",
      orgName: "Dept. of Higher & Technical Education",
      persona: "Sri Alok Kumar (IAS)",
    },
    {
      name: "Active Projects Showcase",
      portalTitle: "Public Innovation Registry",
      href: "/projects",
      description: "Explore all 5+ flagship engineering prototypes deployed in field with student teams, academic mentors, and corporate sponsors.",
      icon: <Rocket className="w-7 h-7 text-teal-600" />,
      badge: "State Innovation Showcase",
      badgeColor: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800",
      borderColor: "hover:border-teal-500",
      accentColor: "text-teal-600",
      orgName: "Open Innovation Repository",
      persona: "Public & Stakeholder View",
    },
  ];

  const handleEnterWorkspace = async (card: DashboardCard) => {
    if (card.role) {
      if (!profile || profile.role !== card.role) {
        await signIn(card.role);
      }
    }
    router.push(card.href);
  };

  return (
    <section className="py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E5E0D4] text-xs font-bold uppercase tracking-wider text-[#D9531E]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Jharkhand Societal Innovation Network
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 font-serif">
          Select Your Stakeholder Portal
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Sign into your role-specific dashboard or switch instantly to test any workspace in Jharkhand’s grassroots innovation ecosystem.
        </p>

        {profile && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs shadow-sm">
            <span className="text-slate-500">Currently Active:</span>
            <strong className="text-slate-800 dark:text-slate-200">{profile.full_name}</strong>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              {profile.role}
            </span>
          </div>
        )}
      </div>

      {/* Grid of Portals */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {dashboards.map((card) => {
          const isActive = profile?.role && card.role === profile.role;

          return (
            <div
              key={card.name}
              className={`group flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 border ${
                isActive
                  ? "border-[#D9531E] ring-2 ring-[#D9531E]/20"
                  : "border-slate-200 dark:border-slate-800"
              } ${card.borderColor}`}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-800">
                    {card.icon}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                    {isActive && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Active Session
                      </span>
                    )}
                  </div>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#D9531E] transition-colors">
                  {card.portalTitle}
                </h2>

                {card.orgName && (
                  <div className="text-[11px] font-semibold text-slate-500 mt-1">
                    Default: {card.orgName}
                  </div>
                )}

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleEnterWorkspace(card)}
                  className="w-full flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50 hover:bg-[#FAF7F2] dark:bg-slate-800/60 dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#D9531E] transition-colors border border-slate-200 dark:border-slate-700/80 hover:border-[#D9531E]/40"
                >
                  <span>
                    {card.role ? `Enter as ${card.name}` : "Explore Showcase"}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
