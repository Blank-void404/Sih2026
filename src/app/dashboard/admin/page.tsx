"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  GraduationCap,
  Users,
  CheckCircle2,
  AlertTriangle,
  FolderKanban,
  DollarSign,
  MapPin,
  TrendingUp,
  Award,
  Search,
  FileText
} from "lucide-react";
import { ActiveProject, SocietalChallenge, getStoredProjects, getStoredChallenges } from "@/lib/data-store";
import { useAuth } from "@/components/auth-provider";

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [projects, setProjects] = useState<ActiveProject[]>([]);
  const [challenges, setChallenges] = useState<SocietalChallenge[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProjects(getStoredProjects());
    setChallenges(getStoredChallenges());
  }, []);

  const totalCSR = "₹22,60,000";
  const totalStudents = projects.reduce((acc, p) => acc + p.team.length, 0);

  const DISTRICT_METRICS = [
    { district: "Khunti", challenges: 48, activeProjects: 1, leadUni: "BIT Mesra", status: "On Track" },
    { district: "Giridih", challenges: 62, activeProjects: 1, leadUni: "BAU Kanke", status: "On Track" },
    { district: "Latehar", challenges: 54, activeProjects: 1, leadUni: "AIIMS Deoghar", status: "High Priority" },
    { district: "Dhanbad", challenges: 98, activeProjects: 1, leadUni: "IIT (ISM) Dhanbad", status: "On Track" },
    { district: "Simdega", challenges: 37, activeProjects: 1, leadUni: "Ranchi University", status: "On Track" },
    { district: "Ranchi", challenges: 142, activeProjects: 0, leadUni: "Pending Allocation", status: "Review" },
    { district: "West Singhbhum", challenges: 83, activeProjects: 0, leadUni: "Pending Allocation", status: "Review" },
    { district: "Gumla", challenges: 41, activeProjects: 0, leadUni: "Pending Allocation", status: "Review" },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-2xl font-bold shadow-lg shadow-amber-500/20 shrink-0">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Apex Oversight Portal
                </span>
                <span className="text-xs text-slate-400">Govt. of Jharkhand</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                State Innovation & Higher Technical Oversight Portal
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
                Real-time governance dashboard monitoring citizen challenge conversion, university research cohorts, and corporate CSR capital deployment across 24 districts.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/projects"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 transition"
            >
              Public Projects Portal
            </Link>
            <Link
              href="/explore"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 shadow-md transition"
            >
              Grassroots Repository
            </Link>
          </div>
        </div>

        {/* Aggregate KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Total Grassroots Submissions</span>
              <FileText className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">1,240+</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Across 24 districts</div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Funded Active Projects</span>
              <FolderKanban className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">{projects.length} Flagship</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Under faculty mentorship</div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Student Researchers Deployed</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-blue-300">{totalStudents}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">BIT, IIT, BAU, AIIMS, RU</div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Committed CSR Capital</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">{totalCSR}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Schedule VII compliant</div>
          </div>
        </div>
      </div>

      {/* Statewide Projects Compliance Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Statewide Projects Compliance & Milestone Tracker
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Audited progress, assigned university, lead faculty, and industry sponsor.
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            All 5 Projects In Good Standing
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Project Title</th>
                  <th className="py-3.5 px-4">District</th>
                  <th className="py-3.5 px-4">University & Mentor</th>
                  <th className="py-3.5 px-4">Corporate Sponsor</th>
                  <th className="py-3.5 px-4">Progress</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100 max-w-xs truncate">
                      {proj.title}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      {proj.district}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{proj.university}</div>
                      <div className="text-[10px] text-slate-400">{proj.mentor.name}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-semibold text-purple-700 dark:text-purple-300">
                        {proj.industryPartner?.name || "Pending"}
                      </span>
                      <div className="text-[10px] text-slate-400">{proj.industryPartner?.fundingPledged}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${proj.progress}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{proj.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {proj.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* District Innovation Density Table */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            District Innovation Density & Coverage Matrix
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Cross-district mapping of grassroots issues vs. university labs mobilized.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DISTRICT_METRICS.map((dm) => (
            <div
              key={dm.district}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {dm.district}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    dm.status === "On Track"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      : dm.status === "High Priority"
                      ? "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {dm.status}
                </span>
              </div>

              <div className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Problems Logged:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{dm.challenges}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Assigned Lab:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{dm.leadUni}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Active Prototypes:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">{dm.activeProjects}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
