"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Building2,
  Users,
  Target,
  ArrowRight
} from "lucide-react";
import { ActiveProject, getStoredProjects, updateProjectMilestoneStatus, saveStoredProjects } from "@/lib/data-store";

export default function UniversityProjectsPage() {
  const [projects, setProjects] = useState<ActiveProject[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setProjects(getStoredProjects());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleMilestoneToggle = (projectId: string, milestoneId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED";
    const updated = updateProjectMilestoneStatus(projectId, milestoneId, nextStatus);
    setProjects(updated);
    showToast("Milestone updated.");
  };

  const handleUpdateProgress = (projectId: string, delta: number) => {
    const updated = projects.map((p) => {
      if (p.id === projectId) {
        const next = Math.max(0, Math.min(100, p.progress + delta));
        return { ...p, progress: next };
      }
      return p;
    });
    setProjects(updated);
    saveStoredProjects(updated);
    showToast("Project progress updated.");
  };

  return (
    <div className="space-y-6 pb-12">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">University Active Projects</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track prototype development, adjust milestones, and log progress for academic compliance.
          </p>
        </div>
        <Link
          href="/dashboard/university"
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          &larr; Back to University Overview
        </Link>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    {project.category}
                  </span>
                  <span className="text-xs text-slate-400">ID: {project.id}</span>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {project.district}, Jharkhand
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mentor: <strong className="text-slate-700 dark:text-slate-300">{project.mentor.name}</strong> • Team: {project.team.length} Students • Partner: {project.industryPartner?.name || "Seeking Partner"}
                </p>
              </div>

              {/* Progress updater buttons */}
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">Completion</div>
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">{project.progress}%</div>
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleUpdateProgress(project.id, 5)}
                    className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[11px] font-bold hover:bg-emerald-700"
                  >
                    +5%
                  </button>
                  <button
                    onClick={() => handleUpdateProgress(project.id, -5)}
                    className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded text-[11px] font-bold"
                  >
                    -5%
                  </button>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              />
            </div>

            {/* Milestones List */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Milestones Checklist:</span>
                <span className="text-[11px] text-slate-400">Click to toggle status</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {project.milestones.map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => handleMilestoneToggle(project.id, m.id, m.status)}
                    className={`text-left p-3 rounded-xl border text-xs transition flex items-start justify-between ${
                      m.status === "COMPLETED"
                        ? "bg-emerald-50/70 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-200"
                        : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 mt-0.5 ${
                          m.status === "COMPLETED" ? "text-emerald-600 fill-emerald-100" : "text-slate-400"
                        }`}
                      />
                      <div>
                        <div className="font-semibold">{m.title}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">Due: {m.dueDate}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase">{m.status}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
