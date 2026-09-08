"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  GraduationCap,
  Building2,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ExternalLink,
  ChevronRight,
  X,
  PlusCircle,
  FileCheck,
  Target,
  Award,
  Droplets,
  Zap,
  Wheat,
  HeartPulse,
  TreePine,
  Briefcase
} from "lucide-react";
import {
  ActiveProject,
  getStoredProjects,
  updateProjectMilestoneStatus,
  addIndustrySupportToProject
} from "@/lib/data-store";

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Water & Sanitation": {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
  },
  "Renewable Energy": {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
  },
  "Agriculture & Soil": {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  "Healthcare & Nutrition": {
    bg: "bg-rose-50 dark:bg-rose-950/40",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-800",
  },
  "Education & Skills": {
    bg: "bg-purple-50 dark:bg-purple-950/40",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800",
  },
  "Rural Infrastructure": {
    bg: "bg-orange-50 dark:bg-orange-950/40",
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-200 dark:border-orange-800",
  },
};

export default function ActiveProjectsPage() {
  const [projects, setProjects] = useState<ActiveProject[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<ActiveProject | null>(null);

  useEffect(() => {
    setProjects(getStoredProjects());
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        search.trim() === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.problemStatement.toLowerCase().includes(search.toLowerCase()) ||
        p.university.toLowerCase().includes(search.toLowerCase()) ||
        p.district.toLowerCase().includes(search.toLowerCase()) ||
        p.team.some((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.role.toLowerCase().includes(search.toLowerCase())) ||
        p.mentor.name.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesDistrict = selectedDistrict === "All" || p.district.toLowerCase() === selectedDistrict.toLowerCase();
      const matchesStatus = selectedStatus === "All" || p.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesDistrict && matchesStatus;
    });
  }, [projects, search, selectedCategory, selectedDistrict, selectedStatus]);

  const handleMilestoneToggle = (projectId: string, milestoneId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED";
    const updated = updateProjectMilestoneStatus(projectId, milestoneId, nextStatus);
    setProjects(updated);
    if (activeModalProject && activeModalProject.id === projectId) {
      const refreshed = updated.find((p) => p.id === projectId);
      if (refreshed) setActiveModalProject(refreshed);
    }
  };

  const districts = ["All", ...Array.from(new Set(projects.map((p) => p.district)))];
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  return (
    <div className="space-y-10 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-emerald-950 text-white p-8 md:p-12 shadow-2xl border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Jharkhand Academic & Field Innovation Hub
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Active Societal <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Projects</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Multidisciplinary university student teams and faculty mentors actively engineering on-ground solutions for Jharkhand's pressing societal bottlenecks, with industry corporate sponsorship and government deployment channels.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/dashboard/university"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              <GraduationCap className="w-4 h-4" /> University Workspace
            </Link>
            <Link
              href="/dashboard/industry"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 backdrop-blur-sm transition-all"
            >
              <Building2 className="w-4 h-4" /> Industry Partner Hub
            </Link>
          </div>
        </div>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
          <div>
            <div className="text-2xl md:text-3xl font-black text-emerald-400">{projects.length} Flagship</div>
            <div className="text-xs text-slate-400 font-medium">Active Research Projects</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-teal-300">
              {projects.reduce((acc, p) => acc + p.team.length, 0)} Students
            </div>
            <div className="text-xs text-slate-400 font-medium">Engineering Researchers</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-amber-300">{projects.length} Senior</div>
            <div className="text-xs text-slate-400 font-medium">Faculty Mentors Assigned</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-blue-300">₹22.6 Lakhs</div>
            <div className="text-xs text-slate-400 font-medium">CSR Funding Committed</div>
          </div>
        </div>
      </section>

      {/* Search & Filtering Toolbar */}
      <section className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            id="projects-search"
            type="text"
            placeholder="Search projects by title, district, university, student name, mentor, or technology..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Category */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 shadow-sm text-xs font-medium text-slate-700 dark:text-slate-300">
              <span className="text-slate-400">Domain:</span>
              <select
                id="projects-category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer font-semibold"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="dark:bg-slate-900">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 shadow-sm text-xs font-medium text-slate-700 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <select
                id="projects-district-filter"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer font-semibold"
              >
                {districts.map((d) => (
                  <option key={d} value={d} className="dark:bg-slate-900">
                    {d === "All" ? "All Districts" : d}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 shadow-sm text-xs font-medium text-slate-700 dark:text-slate-300">
              <span className="text-slate-400">Status:</span>
              <select
                id="projects-status-filter"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer font-semibold"
              >
                <option value="All" className="dark:bg-slate-900">All Statuses</option>
                <option value="PLANNING" className="dark:bg-slate-900">Planning</option>
                <option value="ONGOING" className="dark:bg-slate-900">Ongoing</option>
                <option value="REVIEW" className="dark:bg-slate-900">Review</option>
                <option value="COMPLETED" className="dark:bg-slate-900">Completed</option>
              </select>
            </div>

            {(search || selectedCategory !== "All" || selectedDistrict !== "All" || selectedStatus !== "All") && (
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                  setSelectedDistrict("All");
                  setSelectedStatus("All");
                }}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1"
              >
                Reset Filters
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            Showing <strong className="text-slate-800 dark:text-slate-200">{filteredProjects.length}</strong> active project{filteredProjects.length === 1 ? "" : "s"}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const catColors = CATEGORY_COLORS[project.category] || {
              bg: "bg-slate-50 dark:bg-slate-800",
              text: "text-slate-700 dark:text-slate-300",
              border: "border-slate-200 dark:border-slate-700",
            };

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => setActiveModalProject(project)}
                className="group relative flex flex-col justify-between bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 sm:p-7 cursor-pointer overflow-hidden"
              >
                {/* Progress bar line at top */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>

                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${catColors.bg} ${catColors.text} ${catColors.border}`}>
                      {project.category}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {project.status} ({project.progress}%)
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2 leading-snug">
                    {project.title}
                  </h3>

                  {/* Problem & District */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{project.district}, Jharkhand</span>
                    <span>•</span>
                    <span className="truncate">{project.university}</span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Milestones Card Snippet */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2 mb-4 text-xs">
                    <div className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-700 dark:text-slate-300">Current Milestone:</span>
                        <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">
                          {project.currentMilestone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
                      <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-700 dark:text-slate-300">Next Milestone:</span>
                        <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">
                          {project.nextMilestone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Team & Mentor Previews */}
                  <div className="space-y-2 mb-4 text-xs">
                    {/* Mentor */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-[10px]">
                        🎓
                      </div>
                      <div className="truncate">
                        <span className="text-slate-500">Mentor: </span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{project.mentor.name}</span>
                        <span className="text-slate-400 text-[11px] ml-1">({project.mentor.specialization})</span>
                      </div>
                    </div>

                    {/* Student Team Pill list */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-[10px]">
                        <Users className="w-3 h-3" />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.team.map((member) => (
                          <span
                            key={member.id}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-medium text-slate-700 dark:text-slate-300"
                          >
                            <span className="font-semibold">{member.name}</span>
                            <span className="text-slate-400">({member.role})</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Industry Partner Badge if present */}
                    {project.industryPartner && (
                      <div className="flex items-center gap-2 pt-1">
                        <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-[10px]">
                          <Building2 className="w-3 h-3" />
                        </div>
                        <div className="text-[11px] truncate">
                          <span className="text-slate-500">Industry Partner: </span>
                          <span className="font-bold text-purple-700 dark:text-purple-300">{project.industryPartner.name}</span>
                          <span className="text-slate-400 ml-1">({project.industryPartner.fundingPledged} pledged)</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom / Progress & Action */}
                <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Target: {project.expectedCompletionDate}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                    View Project Details &rarr;
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Comprehensive Project Detail Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2 pr-8">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300">
                      {activeModalProject.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300">
                      {activeModalProject.district} District
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/60 dark:text-purple-300">
                      Progress: {activeModalProject.progress}%
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
                    {activeModalProject.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Lead Institution: <strong className="text-slate-800 dark:text-slate-200">{activeModalProject.university}</strong> • Timeline: {activeModalProject.startDate} to {activeModalProject.expectedCompletionDate}
                  </p>
                </div>

                {/* Problem Statement Box */}
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1">
                    Grassroots Problem Addressed:
                  </h4>
                  <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                    {activeModalProject.problemStatement}
                  </p>
                </div>

                {/* Full Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Technical Approach & Deployment Architecture
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {activeModalProject.description}
                  </p>
                </div>

                {/* Team & Mentor Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Student Team Roster */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-3">
                      <Users className="w-4 h-4 text-emerald-600" /> Student Research Team ({activeModalProject.team.length} Members)
                    </h4>
                    <div className="space-y-2.5">
                      {activeModalProject.team.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                              {member.name}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                              {member.branch} • {member.university}
                            </div>
                          </div>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            {member.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mentor & Industry Partner */}
                  <div className="space-y-4">
                    {/* Mentor Profile */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
                        <GraduationCap className="w-4 h-4 text-blue-600" /> Faculty Mentor
                      </h4>
                      <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                        <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {activeModalProject.mentor.name}
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-400">
                          {activeModalProject.mentor.title}, {activeModalProject.mentor.department}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          University: {activeModalProject.mentor.university}
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700 text-[11px]">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">Specialization: </span>
                          <span className="text-slate-600 dark:text-slate-400">{activeModalProject.mentor.specialization}</span>
                        </div>
                      </div>
                    </div>

                    {/* Industry Partner */}
                    {activeModalProject.industryPartner ? (
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 flex items-center gap-1.5 mb-2">
                          <Building2 className="w-4 h-4 text-purple-600" /> Corporate Industry Partner
                        </h4>
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                          <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            {activeModalProject.industryPartner.name}
                          </div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400">
                            Sector: {activeModalProject.industryPartner.sector}
                          </div>
                          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                            Funding Pledged: {activeModalProject.industryPartner.fundingPledged}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {activeModalProject.industryPartner.supportType.map((st) => (
                              <span key={st} className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                                {st}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-dashed border-slate-300 dark:border-slate-700 text-center">
                        <Building2 className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Seeking Industry Partner</div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Sponsor this project with CSR funding, technical mentoring, or testing infrastructure.
                        </p>
                        <Link
                          href="/dashboard/industry"
                          className="inline-block mt-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-700"
                        >
                          Offer Support via Industry Portal
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Milestones Checklist */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-emerald-600" /> Milestone Execution Checklist
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      Click checkmark to toggle status
                    </span>
                  </div>

                  <div className="space-y-2">
                    {activeModalProject.milestones.map((m) => (
                      <div
                        key={m.id}
                        className="flex items-start justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800"
                      >
                        <div className="flex items-start gap-3">
                          <button
                            type="button"
                            onClick={() => handleMilestoneToggle(activeModalProject.id, m.id, m.status)}
                            className={`p-1 rounded-full transition ${
                              m.status === "COMPLETED"
                                ? "bg-emerald-500 text-white"
                                : m.status === "IN_PROGRESS"
                                ? "bg-amber-500 text-white"
                                : "bg-slate-200 dark:bg-slate-700 text-slate-400"
                            }`}
                            title="Toggle status"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                              {m.title}
                            </div>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                              {m.description}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0 ml-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              m.status === "COMPLETED"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                : m.status === "IN_PROGRESS"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                            }`}
                          >
                            {m.status}
                          </span>
                          <div className="text-[10px] text-slate-400 mt-1">Due: {m.dueDate}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Updates Feed */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Recent Activity & Lab Updates
                  </h4>
                  <div className="space-y-2">
                    {activeModalProject.recentUpdates.map((update) => (
                      <div
                        key={update.id}
                        className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900 dark:text-slate-100">{update.title}</span>
                          <span className="text-[10px] text-slate-400">{update.date}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400">{update.content}</p>
                        <div className="text-[10px] text-slate-400 mt-1">Posted by {update.author}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
