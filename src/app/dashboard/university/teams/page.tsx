"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, GraduationCap, MapPin, Mail, Award, FolderKanban } from "lucide-react";
import { ActiveProject, getStoredProjects } from "@/lib/data-store";

export default function UniversityTeamsPage() {
  const [projects, setProjects] = useState<ActiveProject[]>([]);

  useEffect(() => {
    setProjects(getStoredProjects());
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Student Teams & Faculty Mentors Roster
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Directory of active research squads (3–6 student researchers each) and supervising senior faculty.
          </p>
        </div>
        <Link
          href="/dashboard/university"
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          &larr; Back to University Overview
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4"
          >
            {/* Project Header */}
            <div>
              <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                {project.category}
              </span>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1.5">
                {project.title}
              </h2>
              <div className="text-xs text-slate-500 mt-0.5">{project.district} District • {project.university}</div>
            </div>

            {/* Mentor Card */}
            <div className="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  🎓
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {project.mentor.name}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    {project.mentor.title}, {project.mentor.department}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Specialization: <strong className="text-slate-700 dark:text-slate-300">{project.mentor.specialization}</strong>
                  </div>
                  <div className="text-[10px] text-blue-600 dark:text-blue-400 mt-0.5 font-mono">
                    {project.mentor.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Student Team List */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Student Researchers ({project.team.length}):</span>
                <span className="text-[10px] text-slate-400">Multidisciplinary Cohort</span>
              </div>

              <div className="space-y-1.5">
                {project.team.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-slate-100">{member.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {member.branch} • {member.university}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-slate-200 dark:border-slate-700">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
