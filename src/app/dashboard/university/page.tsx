"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap,
  Sparkles,
  Users,
  FolderKanban,
  DollarSign,
  Building2,
  CheckCircle2,
  Clock,
  ArrowRight,
  PlusCircle,
  X,
  FileText,
  Target,
  Send,
  UserPlus,
  Award,
  AlertTriangle,
  Sliders,
  Calendar
} from "lucide-react";
import {
  ActiveProject,
  SocietalChallenge,
  Mentor,
  TeamMember,
  getStoredProjects,
  getStoredChallenges,
  adoptChallengeAsProject,
  updateProjectMilestoneStatus,
  saveStoredChallenges,
  saveStoredProjects
} from "@/lib/data-store";
import { useAuth } from "@/components/auth-provider";

export default function UniversityDashboard() {
  const { profile } = useAuth();
  const isUniRole = profile?.role === "UNIVERSITY";
  const universityName = isUniRole && profile?.organization_name
    ? profile.organization_name
    : "Birsa Institute of Technology (BIT) Mesra";

  const [projects, setProjects] = useState<ActiveProject[]>([]);
  const [challenges, setChallenges] = useState<SocietalChallenge[]>([]);
  const [activeTab, setActiveTab] = useState<"recommended" | "active" | "teams" | "proposals" | "collaborations">("recommended");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<SocietalChallenge | null>(null);

  // Adopt form state
  const [mentorName, setMentorName] = useState("Dr. Anjali Mehta");
  const [mentorDept, setMentorDept] = useState("Environmental Engineering");
  const [mentorSpec, setMentorSpec] = useState("Water Management & IoT");
  const [mentorEmail, setMentorEmail] = useState("amehta@bitmesra.ac.in");

  const [student1Name, setStudent1Name] = useState("Aarav Sharma");
  const [student1Branch, setStudent1Branch] = useState("Computer Engineering");
  const [student1Role, setStudent1Role] = useState("ML Developer");

  const [student2Name, setStudent2Name] = useState("Priya Patil");
  const [student2Branch, setStudent2Branch] = useState("Electronics");
  const [student2Role, setStudent2Role] = useState("IoT Developer");

  const [student3Name, setStudent3Name] = useState("Rohan Kumar");
  const [student3Branch, setStudent3Branch] = useState("Computer Science");
  const [student3Role, setStudent3Role] = useState("Backend Developer");

  const [student4Name, setStudent4Name] = useState("Sneha Verma");
  const [student4Branch, setStudent4Branch] = useState("Civil Engineering");
  const [student4Role, setStudent4Role] = useState("Water Systems Researcher");

  // Proposal modal state
  const [proposalSummary, setProposalSummary] = useState("");
  const [proposedBudget, setProposedBudget] = useState("₹3,50,000");
  const [proposedTimeline, setProposedTimeline] = useState("6 Months");

  useEffect(() => {
    setProjects(getStoredProjects());
    setChallenges(getStoredChallenges());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenAdoptModal = (challenge: SocietalChallenge) => {
    setSelectedChallenge(challenge);
    setIsAdoptModalOpen(true);
  };

  const handleOpenProposalModal = (challenge: SocietalChallenge) => {
    setSelectedChallenge(challenge);
    setProposalSummary(`Developing an engineering prototype to tackle: ${challenge.title}.`);
    setIsProposalModalOpen(true);
  };

  const handleRejectChallenge = (challengeId: string) => {
    const updated = challenges.filter((c) => c.id !== challengeId);
    setChallenges(updated);
    saveStoredChallenges(updated);
    showToast("Challenge dismissed from university recommendations.");
  };

  const handleConfirmAdoption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChallenge) return;

    const mentor: Mentor = {
      id: `men-${Date.now()}`,
      name: mentorName,
      title: "Professor",
      department: mentorDept,
      university: universityName,
      specialization: mentorSpec,
      email: mentorEmail,
    };

    const team: TeamMember[] = [
      {
        id: `tm-${Date.now()}-1`,
        name: student1Name,
        branch: student1Branch,
        university: "BIT Mesra",
        role: student1Role,
      },
      {
        id: `tm-${Date.now()}-2`,
        name: student2Name,
        branch: student2Branch,
        university: "BIT Mesra",
        role: student2Role,
      },
      {
        id: `tm-${Date.now()}-3`,
        name: student3Name,
        branch: student3Branch,
        university: "BIT Mesra",
        role: student3Role,
      },
      {
        id: `tm-${Date.now()}-4`,
        name: student4Name,
        branch: student4Branch,
        university: "BIT Mesra",
        role: student4Role,
      },
    ];

    const newProj = adoptChallengeAsProject(
      selectedChallenge,
      universityName,
      mentor,
      team
    );

    setProjects(getStoredProjects());
    setChallenges(getStoredChallenges());
    setIsAdoptModalOpen(false);
    showToast(`Challenge successfully accepted! New project "${newProj.title}" initialized.`);
  };

  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChallenge) return;

    showToast(`Proposal submitted to State Innovation Council for: "${selectedChallenge.title}".`);
    setIsProposalModalOpen(false);
  };

  const handleMilestoneToggle = (projectId: string, milestoneId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "COMPLETED" ? "IN_PROGRESS" : "COMPLETED";
    const updated = updateProjectMilestoneStatus(projectId, milestoneId, nextStatus);
    setProjects(updated);
    showToast("Milestone status updated.");
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

  const totalStudents = projects.reduce((acc, p) => acc + p.team.length, 0);

  return (
    <div className="space-y-8 pb-16">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* University Profile Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold shadow-lg shadow-blue-500/20 shrink-0">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Accredited University Partner (NAAC A++)
                </span>
                <span className="text-xs text-slate-400">NIRF Ranked #21</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                {universityName}
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
                Jharkhand Societal Innovation Workspace — Mobilizing faculty laboratories and student engineering cohorts to solve state bottlenecks.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/dashboard/university/projects"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 transition"
            >
              Manage Projects
            </Link>
            <Link
              href="/dashboard/university/teams"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-slate-950 shadow-md transition"
            >
              Teams & Mentors
            </Link>
          </div>
        </div>

        {/* Aggregate KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Active Projects</span>
              <FolderKanban className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">{projects.length} Flagship</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Across 5 Jharkhand districts</div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Student Researchers</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-blue-300">{totalStudents} Students</div>
            <div className="text-[11px] text-slate-400 mt-0.5">3–6 per multidisciplinary team</div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Faculty Mentors</span>
              <GraduationCap className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">{projects.length} Assigned</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Senior Professors & HODs</div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>CSR Grants Received</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">₹22.6 Lakhs</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Tata Steel, SAIL, Apollo, Dhanuka</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("recommended")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === "recommended"
              ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          Recommended Challenges ({challenges.length})
        </button>

        <button
          onClick={() => setActiveTab("active")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === "active"
              ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <FolderKanban className="w-4 h-4 text-emerald-500" />
          Active Projects ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab("teams")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === "teams"
              ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Users className="w-4 h-4 text-blue-500" />
          Student Teams & Mentors ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab("collaborations")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === "collaborations"
              ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Building2 className="w-4 h-4 text-purple-500" />
          Industry Collaborations
        </button>
      </div>

      {/* Tab 1: Recommended Challenges */}
      {activeTab === "recommended" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                AI-Matched Grassroots Challenges
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Societal issues submitted by citizens across Jharkhand districts matching your faculty departments.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Ready for Academic Adoption
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((ch) => (
              <div
                key={ch.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {ch.category}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                      Priority: {ch.ai_priority} ({ch.ai_severity}/10)
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1.5 leading-snug">
                    {ch.title}
                  </h3>
                  <div className="text-xs text-slate-500 mb-3">District: {ch.district} • Submitter: {ch.reported_by}</div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                    {ch.description}
                  </p>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Required Skills:</span>
                      <div className="flex flex-wrap gap-1">
                        {ch.ai_skills_required?.map((s) => (
                          <span key={s} className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-400">Estimated Capital Grant:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{ch.funding_needed}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleOpenAdoptModal(ch)}
                    className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-1 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Accept & Form Team
                  </button>
                  <button
                    onClick={() => handleOpenProposalModal(ch)}
                    className="py-2 px-3 rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold hover:bg-blue-100 transition flex items-center justify-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" /> Submit Proposal
                  </button>
                  <button
                    onClick={() => handleRejectChallenge(ch.id)}
                    className="py-2 px-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 text-slate-600 dark:text-slate-400 text-xs font-semibold transition"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Active Projects Tracker */}
      {activeTab === "active" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Institutional Active Projects
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Update progress percentages, toggle milestones, and monitor student lab activities.
              </p>
            </div>
            <Link
              href="/dashboard/university/projects"
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Open Dedicated Projects View &rarr;
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
                      Mentor: <strong className="text-slate-700 dark:text-slate-300">{project.mentor.name}</strong> • Team: {project.team.length} Students • Partner: {project.industryPartner?.name || "Pending Sponsorship"}
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
                        title="Increase 5%"
                      >
                        +5%
                      </button>
                      <button
                        onClick={() => handleUpdateProgress(project.id, -5)}
                        className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded text-[11px] font-bold"
                        title="Decrease 5%"
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
                    <span>Project Milestones:</span>
                    <span className="text-[11px] text-slate-400">Click to toggle complete</span>
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
      )}

      {/* Tab 3: Teams & Mentors */}
      {activeTab === "teams" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Assigned Student Research Cohorts & Mentors
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Multidisciplinary squads (3–6 students each) guided by designated faculty chairs.
              </p>
            </div>
            <Link
              href="/dashboard/university/teams"
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Full Roster Directory &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {proj.title}
                  </span>
                  <div className="flex items-center gap-3 mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                      🎓
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {proj.mentor.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {proj.mentor.title}, {proj.mentor.department}
                      </div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                        Specialization: {proj.mentor.specialization}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Student Team Members ({proj.team.length}):
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {proj.team.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs"
                      >
                        <div>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{member.name}</span>
                          <span className="text-slate-400 text-[11px] ml-2">({member.branch})</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
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
      )}

      {/* Tab 4: Industry Collaborations */}
      {activeTab === "collaborations" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Corporate & Industrial Partnerships
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              CSR grants, testing infrastructure, and corporate mentors attached to BIT Mesra innovation labs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects
              .filter((p) => p.industryPartner !== undefined)
              .map((p) => (
                <div
                  key={p.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" /> {p.industryPartner?.name}
                    </span>
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                      {p.industryPartner?.fundingPledged}
                    </span>
                  </div>

                  <div className="text-xs text-slate-700 dark:text-slate-300 font-semibold">
                    Attached to: {p.title}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
                    <div className="text-slate-500">
                      Sector: <span className="font-semibold text-slate-800 dark:text-slate-200">{p.industryPartner?.sector}</span>
                    </div>
                    <div className="text-slate-500">
                      Contact: <span className="font-semibold text-slate-800 dark:text-slate-200">{p.industryPartner?.contactPerson}</span> ({p.industryPartner?.contactEmail})
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {Array.isArray(p.industryPartner?.supportType) ? p.industryPartner.supportType.map((st) => (
                      <span
                        key={st}
                        className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                      >
                        {st}
                      </span>
                    )) : null}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Modal 1: Accept Challenge & Create Team */}
      <AnimatePresence>
        {isAdoptModalOpen && selectedChallenge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <button
                onClick={() => setIsAdoptModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Academic Adoption Workflow
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                    Adopt Challenge & Allocate Cohort
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Forming university project team for: <strong className="text-slate-800 dark:text-slate-200">{selectedChallenge.title}</strong>
                  </p>
                </div>

                <form onSubmit={handleConfirmAdoption} className="space-y-5">
                  {/* Mentor Assignment */}
                  <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-blue-600" /> Assign Faculty Mentor
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Mentor Full Name</label>
                        <input
                          type="text"
                          required
                          value={mentorName}
                          onChange={(e) => setMentorName(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Department</label>
                        <input
                          type="text"
                          required
                          value={mentorDept}
                          onChange={(e) => setMentorDept(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Mentor Specialization</label>
                        <input
                          type="text"
                          required
                          value={mentorSpec}
                          onChange={(e) => setMentorSpec(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Official Email</label>
                        <input
                          type="email"
                          required
                          value={mentorEmail}
                          onChange={(e) => setMentorEmail(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Student Team Assignment (3-6 members) */}
                  <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-emerald-600" /> Student Research Squad (4 Members)
                    </h4>

                    {/* Member 1 */}
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Student 1 Name"
                        value={student1Name}
                        onChange={(e) => setStudent1Name(e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Department"
                        value={student1Branch}
                        onChange={(e) => setStudent1Branch(e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Team Role (e.g. ML Lead)"
                        value={student1Role}
                        onChange={(e) => setStudent1Role(e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                    </div>

                    {/* Member 2 */}
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Student 2 Name"
                        value={student2Name}
                        onChange={(e) => setStudent2Name(e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Department"
                        value={student2Branch}
                        onChange={(e) => setStudent2Branch(e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Team Role"
                        value={student2Role}
                        onChange={(e) => setStudent2Role(e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                    </div>

                    {/* Member 3 */}
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Student 3 Name"
                        value={student3Name}
                        onChange={(e) => setStudent3Name(e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Department"
                        value={student3Branch}
                        onChange={(e) => setStudent3Branch(e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Team Role"
                        value={student3Role}
                        onChange={(e) => setStudent3Role(e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                    </div>

                    {/* Member 4 */}
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Student 4 Name"
                        value={student4Name}
                        onChange={(e) => setStudent4Name(e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Department"
                        value={student4Branch}
                        onChange={(e) => setStudent4Branch(e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Team Role"
                        value={student4Role}
                        onChange={(e) => setStudent4Role(e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Formalize Adoption & Register Active Project
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
        {/* Modal 2: Submit Research Proposal */}
        {isProposalModalOpen && selectedChallenge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <button
                onClick={() => setIsProposalModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    State Innovation Grant Application
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                    Submit Academic Research Proposal
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Target Challenge: <strong className="text-slate-800 dark:text-slate-200">{selectedChallenge.title}</strong>
                  </p>
                </div>

                <form onSubmit={handleSubmitProposal} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Project Approach Summary
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={proposalSummary}
                      onChange={(e) => setProposalSummary(e.target.value)}
                      placeholder="Describe methodology, sensor choices, hardware architecture, and planned field trials..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Requested Budget
                      </label>
                      <input
                        type="text"
                        value={proposedBudget}
                        onChange={(e) => setProposedBudget(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Proposed Timeline
                      </label>
                      <input
                        type="text"
                        value={proposedTimeline}
                        onChange={(e) => setProposedTimeline(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <div className="font-semibold text-blue-900 dark:text-blue-200">Submitting Institution:</div>
                    <div>{universityName} (Academic Research Wing)</div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    Submit Proposal to State Innovation Council
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
