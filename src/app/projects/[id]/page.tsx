"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin, Calendar, Users, CheckCircle2, Clock, ArrowLeft,
  ArrowRight, Building2, GraduationCap, Target, Zap, Award,
  ChevronRight, Info, TrendingUp, FileText, Wrench,
  Briefcase, User, ExternalLink, AlertTriangle
} from "lucide-react";
import { getStoredProjects, type ActiveProject } from "@/lib/data-store";

const LIFECYCLE_STAGES = [
  { key: "problem", label: "Problem" },
  { key: "team", label: "Team Formed" },
  { key: "design", label: "Design" },
  { key: "prototype", label: "Prototype" },
  { key: "testing", label: "Field Testing" },
  { key: "deployment", label: "Deployment" },
];

function getProjectStage(project: ActiveProject): number {
  if (project.progress >= 90) return 5;
  if (project.progress >= 70) return 4;
  if (project.progress >= 50) return 3;
  if (project.progress >= 30) return 2;
  if (project.progress >= 15) return 1;
  return 0;
}

const SUPPORT_TYPE_LABELS: Record<string, { label: string; color: string }> = {
  FUNDING: { label: "💰 Funding", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  MENTORSHIP: { label: "🎓 Mentorship", color: "bg-blue-50 text-blue-700 border-blue-200" },
  TECHNOLOGY: { label: "⚡ Technology", color: "bg-purple-50 text-purple-700 border-purple-200" },
  INFRASTRUCTURE: { label: "🏗️ Infrastructure", color: "bg-amber-50 text-amber-700 border-amber-200" },
  TESTING: { label: "🧪 Testing", color: "bg-rose-50 text-rose-700 border-rose-200" },
};

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [project, setProject] = useState<ActiveProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projects = getStoredProjects();
    const found = projects.find(p => p.id === id);
    setProject(found || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-900">Project Not Found</h2>
          <p className="text-slate-600">The project ID &quot;{id}&quot; does not exist.</p>
          <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const currentStage = getProjectStage(project);
  const completedMilestones = project.milestones.filter(m => m.status === "COMPLETED").length;
  const totalMilestones = project.milestones.length;

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Prototype Data Disclaimer */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
        <Info className="w-4 h-4 flex-shrink-0" />
        <span>Prototype Demonstration Data — This project data is for SIH 2026 demonstration purposes.</span>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-emerald-600 transition">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/projects" className="hover:text-emerald-600 transition">Projects</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 font-semibold truncate max-w-[200px]">{project.title}</span>
      </nav>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
            {project.category}
          </span>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
            project.status === "COMPLETED" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" :
            project.status === "ONGOING" ? "bg-amber-100 text-amber-800 border border-amber-200" :
            "bg-blue-100 text-blue-800 border border-blue-200"
          }`}>
            <Clock className="w-3 h-3" />
            {project.status}
          </span>
          <span className="text-xs text-slate-500 font-mono bg-slate-50 px-2 py-1 rounded border border-slate-200">
            {project.id.toUpperCase()}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-serif leading-tight tracking-tight">
          {project.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-emerald-600" /> {project.district}, Jharkhand</span>
          <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-blue-500" /> {project.university}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> Started: {project.startDate}</span>
        </div>
      </motion.div>

      {/* Lifecycle Pipeline */}
      <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" /> Project Lifecycle
          </h3>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">{project.progress}% Complete</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 mb-6">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 rounded-full transition-all duration-700" style={{ width: `${project.progress}%` }} />
        </div>

        {/* Stage Pills */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 overflow-x-auto pb-2">
          {LIFECYCLE_STAGES.map((stage, idx) => (
            <div key={stage.key} className="flex items-center gap-0 flex-shrink-0">
              <div className="flex flex-col items-center text-center min-w-[90px]">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  idx < currentStage ? "bg-emerald-500 text-white" :
                  idx === currentStage ? "bg-amber-500 text-white ring-4 ring-amber-100 scale-110" :
                  "bg-slate-200 text-slate-500"
                }`}>
                  {idx < currentStage ? "✓" : idx === currentStage ? "●" : "○"}
                </div>
                <span className={`text-[10px] mt-1.5 font-semibold leading-tight ${
                  idx < currentStage ? "text-emerald-700" :
                  idx === currentStage ? "text-amber-700 font-bold" :
                  "text-slate-400"
                }`}>{stage.label}</span>
                {idx === currentStage && <span className="text-[8px] text-amber-600 font-bold uppercase tracking-wider mt-0.5">CURRENT</span>}
              </div>
              {idx < LIFECYCLE_STAGES.length - 1 && (
                <div className={`hidden sm:block w-10 h-0.5 ${idx < currentStage ? "bg-emerald-400" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>
      </motion.section>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Problem & Description */}
          <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#D9531E]" /> Original Challenge
            </h3>
            <Link href={`/challenges/${project.challengeId}`} className="block p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 transition group">
              <div className="text-xs text-slate-500 font-mono mb-1">{project.challengeId.toUpperCase()}</div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition">{project.challengeTitle}</h4>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">{project.problemStatement}</p>
            </Link>

            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pt-2">
              <Wrench className="w-4 h-4 text-[#D9531E]" /> Solution Approach
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">{project.description}</p>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Milestone</span>
                <span className="text-xs font-bold text-slate-900">{project.currentMilestone}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Next Milestone</span>
                <span className="text-xs font-bold text-slate-900">{project.nextMilestone}</span>
              </div>
            </div>
          </motion.section>

          {/* Milestones */}
          <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600" /> Milestones
              </h3>
              <span className="text-xs font-bold text-slate-500">{completedMilestones}/{totalMilestones} completed</span>
            </div>
            <div className="space-y-3">
              {project.milestones.map((m, idx) => (
                <div key={m.id} className={`flex gap-3 p-4 rounded-xl border transition ${
                  m.status === "COMPLETED" ? "bg-emerald-50/50 border-emerald-200" :
                  m.status === "IN_PROGRESS" ? "bg-amber-50/50 border-amber-200" :
                  "bg-slate-50 border-slate-100"
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                    m.status === "COMPLETED" ? "bg-emerald-500 text-white" :
                    m.status === "IN_PROGRESS" ? "bg-amber-500 text-white" :
                    "bg-slate-200 text-slate-500"
                  }`}>
                    {m.status === "COMPLETED" ? <CheckCircle2 className="w-4 h-4" /> :
                     m.status === "IN_PROGRESS" ? <Clock className="w-4 h-4" /> :
                     idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-slate-900">{m.title}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        m.status === "COMPLETED" ? "bg-emerald-100 text-emerald-700" :
                        m.status === "IN_PROGRESS" ? "bg-amber-100 text-amber-700" :
                        "bg-slate-100 text-slate-500"
                      }`}>{m.status.replace("_", " ")}</span>
                    </div>
                    <p className="text-xs text-slate-600">{m.description}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">Due: {m.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Recent Updates */}
          <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" /> Activity Timeline
            </h3>
            <div className="space-y-4">
              {project.recentUpdates.map((update, idx) => (
                <div key={update.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow" />
                    {idx < project.recentUpdates.length - 1 && <div className="w-0.5 flex-1 bg-slate-200 mt-1" />}
                  </div>
                  <div className="pb-4">
                    <div className="text-[10px] text-slate-400 font-semibold">{update.date} • {update.author}</div>
                    <h4 className="text-xs font-bold text-slate-900 mt-0.5">{update.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{update.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Sidebar (1/3) */}
        <div className="space-y-6">
          {/* Team Roster */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" /> Student Team ({project.team.length})
            </h4>
            <div className="space-y-2.5">
              {project.team.map(member => (
                <div key={member.id} className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{member.name}</div>
                    <div className="text-[10px] text-slate-500">{member.role} • {member.branch}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Faculty Mentor */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-600" /> Faculty Mentor
            </h4>
            <div className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {project.mentor.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{project.mentor.name}</div>
                <div className="text-[10px] text-slate-600">{project.mentor.title}, {project.mentor.department}</div>
                <div className="text-[10px] text-emerald-600 font-semibold">{project.mentor.specialization}</div>
              </div>
            </div>
          </motion.div>

          {/* Industry Support */}
          {project.industryPartner && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-600" /> Industry Support
              </h4>
              <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 space-y-2">
                <div className="text-xs font-bold text-slate-900">{project.industryPartner.name}</div>
                <div className="text-[10px] text-slate-600">{project.industryPartner.sector}</div>
                {project.industryPartner.fundingPledged && (
                  <div className="text-xs font-bold text-emerald-700">Funding: {project.industryPartner.fundingPledged}</div>
                )}
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.industryPartner.supportType.map(type => {
                    const conf = SUPPORT_TYPE_LABELS[type] || { label: type, color: "bg-slate-50 text-slate-600 border-slate-200" };
                    return (
                      <span key={type} className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${conf.color}`}>
                        {conf.label}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="text-[10px] text-slate-500 space-y-0.5">
                <div>Contact: {project.industryPartner.contactPerson}</div>
              </div>
            </motion.div>
          )}

          {/* Key Dates */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Key Dates</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">Start Date</span><span className="font-semibold text-slate-900">{project.startDate}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Expected Completion</span><span className="font-semibold text-slate-900">{project.expectedCompletionDate}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Progress</span><span className="font-bold text-emerald-700">{project.progress}%</span></div>
            </div>
          </motion.div>

          {/* CTA */}
          <Link
            href="/dashboard/industry"
            className="block w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm text-center transition-all"
          >
            Offer Industry Support →
          </Link>
        </div>
      </div>
    </div>
  );
}
