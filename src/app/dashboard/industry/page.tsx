"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  TrendingUp,
  DollarSign,
  Users,
  Award,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Handshake,
  HeartHandshake,
  Briefcase,
  Layers,
  MapPin,
  Filter,
  Check,
  PlusCircle,
  X
} from "lucide-react";
import {
  ActiveProject,
  SocietalChallenge,
  IndustryPartner,
  getStoredProjects,
  getStoredChallenges,
  addIndustrySupportToProject,
  saveStoredChallenges
} from "@/lib/data-store";
import { useAuth } from "@/components/auth-provider";

export default function IndustryDashboard() {
  const { profile } = useAuth();
  const [projects, setProjects] = useState<ActiveProject[]>([]);
  const [challenges, setChallenges] = useState<SocietalChallenge[]>([]);
  const [activeTab, setActiveTab] = useState<"supported" | "recommended" | "mentorship" | "analytics">("supported");
  const [expressedInterestIds, setExpressedInterestIds] = useState<Set<string>>(new Set());

  // Modal State for Offering Support
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<{ id: string; title: string; isProject: boolean } | null>(null);
  const [supportTypes, setSupportTypes] = useState<string[]>(["FUNDING"]);
  const [pledgedAmount, setPledgedAmount] = useState("₹4,50,000");
  const [supportNote, setSupportNote] = useState("");
  const [contactName, setContactName] = useState(profile?.full_name || "Dr. Vivek Chhabra");
  const [contactEmail, setContactEmail] = useState(profile?.email || "csr.projects@tatasteel.com");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setProjects(getStoredProjects());
    setChallenges(getStoredChallenges());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleExpressInterest = (challengeId: string) => {
    setExpressedInterestIds((prev) => {
      const next = new Set(prev);
      if (next.has(challengeId)) {
        next.delete(challengeId);
        showToast("Removed interest flag.");
      } else {
        next.add(challengeId);
        showToast("Interest expressed! We notified the university innovation council.");
      }
      return next;
    });
  };

  const handleOpenSupportModal = (id: string, title: string, isProject: boolean) => {
    setSelectedTarget({ id, title, isProject });
    setIsSupportModalOpen(true);
  };

  const handleCommitSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTarget) return;

    const partner: IndustryPartner = {
      id: `ind-${Date.now()}`,
      name: profile?.organization_name || "Tata Steel CSR Foundation",
      sector: "Metallurgy, Energy & Community Infrastructure",
      supportType: supportTypes as any,
      fundingPledged: pledgedAmount,
      contactPerson: contactName,
      contactEmail: contactEmail,
    };

    if (selectedTarget.isProject) {
      const updated = addIndustrySupportToProject(selectedTarget.id, partner, supportNote);
      setProjects(updated);
      showToast(`Successfully pledged ${pledgedAmount} support to ${selectedTarget.title}!`);
    } else {
      // It's a challenge, update challenge
      const updated = challenges.map((c) =>
        c.id === selectedTarget.id ? { ...c, status: "ACCEPTED" as const } : c
      );
      setChallenges(updated);
      saveStoredChallenges(updated);
      showToast(`Partnership request submitted for challenge: ${selectedTarget.title}`);
    }

    setIsSupportModalOpen(false);
    setSelectedTarget(null);
  };

  const toggleSupportType = (type: string) => {
    setSupportTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const supportedProjects = projects.filter((p) => p.industryPartner !== undefined);

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Industry Profile Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-2xl font-bold shadow-lg shadow-purple-500/20 shrink-0">
              🏢
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Verified CSR Partner
                </span>
                <span className="text-xs text-slate-400">ID: IND-JH-2026</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                {profile?.organization_name || "Tata Steel CSR Foundation"}
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
                Partnering with Jharkhand Universities and student innovators to fund, mentor, and deploy sustainable societal technology at scale.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/projects"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 transition"
            >
              Browse All Projects
            </Link>
            <button
              onClick={() => {
                if (projects.length > 0) {
                  handleOpenSupportModal(projects[0].id, projects[0].title, true);
                }
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-slate-950 shadow-md transition"
            >
              + Offer New Sponsorship
            </button>
          </div>
        </div>

        {/* Analytics KPIs Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>CSR Funds Pledged</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400">₹22.6 Lakhs</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Across 4 university labs</div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Supported Projects</span>
              <Briefcase className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">{supportedProjects.length} Active</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Water, Soil, Slurry & EdTech</div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Industry Mentors</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-blue-300">12 Engineers</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Guiding 21 student teams</div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
              <span>Beneficiaries Reached</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">12,400+</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Villagers in 6 districts</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab("supported")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === "supported"
              ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Handshake className="w-4 h-4" />
          Active Partnerships ({supportedProjects.length})
        </button>

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
          onClick={() => setActiveTab("mentorship")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === "mentorship"
              ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Users className="w-4 h-4 text-blue-500" />
          Mentorship Requests (5)
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === "analytics"
              ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          Statewide CSR Analytics
        </button>
      </div>

      {/* Tab 1: Supported Projects */}
      {activeTab === "supported" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Projects Supported by Your Industry Group
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Live monitoring of prototypes, milestone completion, and field trials.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {supportedProjects.length} Projects Currently Funded
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {supportedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      {project.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-2 leading-snug">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{project.district}</span>
                      <span>•</span>
                      <span>{project.university}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                      {project.industryPartner?.fundingPledged}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">Pledged Support</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-600 dark:text-slate-400">Project Progress</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">{project.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Support provided tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-xs text-slate-500 mr-1">Provided:</span>
                  {project.industryPartner?.supportType.map((st) => (
                    <span
                      key={st}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {st}
                    </span>
                  ))}
                </div>

                {/* Current Milestone */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Active Deliverable:</span>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {project.currentMilestone}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Lead: <strong className="text-slate-700 dark:text-slate-300">{project.mentor.name}</strong>
                  </div>
                  <button
                    onClick={() => handleOpenSupportModal(project.id, project.title, true)}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    Adjust Support &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Recommended Challenges */}
      {activeTab === "recommended" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Recommended Societal Challenges Seeking Industry Backing
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Matched based on Tata Steel's core competencies (Heavy metallurgy, environmental air safety, water security).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((ch) => {
              const isInterested = expressedInterestIds.has(ch.id);

              return (
                <div
                  key={ch.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {ch.category}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                        Severity: {ch.ai_severity}/10
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 leading-snug">
                      {ch.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                      {ch.description}
                    </p>

                    <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">District:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{ch.district}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Estimated Capital:</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{ch.funding_needed}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">AI Domain:</span>
                        <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[140px]">{ch.ai_domain}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => handleOpenSupportModal(ch.id, ch.title, false)}
                      className="w-full py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Handshake className="w-4 h-4" /> Offer CSR Support / Grant
                    </button>

                    <button
                      onClick={() => handleExpressInterest(ch.id)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition border ${
                        isInterested
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {isInterested ? "✓ Interest Expressed (Notified)" : "Express Interest"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Mentorship Opportunities */}
      {activeTab === "mentorship" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Technical Mentorship & Industry Guidance Board
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Connect corporate engineers and specialists with university teams building physical prototypes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                project: "Smart Water Quality Monitoring System",
                team: "BIT Mesra Student Cohort",
                request: "Industrial calibration of heavy metal multi-electrodes & IP68 sealing against monsoon silt",
                timeCommitment: "2 hours / fortnight",
                expertiseNeeded: ["Electrochemistry", "Industrial Enclosures", "LoRaWAN"],
              },
              {
                project: "Smart Waste Management System",
                team: "IIT (ISM) Dhanbad Innovators",
                request: "Robotic scrap sorting computer vision model validation & conveyor integration",
                timeCommitment: "3 hours / month",
                expertiseNeeded: ["Computer Vision", "Industrial Automation", "Robotics"],
              },
              {
                project: "AI-Based Crop Disease Detection",
                team: "BAU Kanke Agri-Tech Team",
                request: "Drone multispectral imaging integration and cloud inference optimization",
                timeCommitment: "1 hour / week",
                expertiseNeeded: ["Edge AI", "Drone Telemetry", "Agronomy"],
              },
              {
                project: "Rural Education & Digital Learning Platform",
                team: "Ranchi University CS Lab",
                request: "Enterprise battery cycle longevity optimization for off-grid micro-cloud hubs",
                timeCommitment: "2 hours / month",
                expertiseNeeded: ["Battery Management Systems", "Linux Microservers"],
              },
            ].map((mentorReq, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    Open Mentorship Request
                  </span>
                  <span className="text-xs text-slate-400">{mentorReq.timeCommitment}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {mentorReq.project}
                </h3>
                <div className="text-xs text-slate-500">{mentorReq.team}</div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <strong>Need:</strong> {mentorReq.request}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {mentorReq.expertiseNeeded.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => showToast(`Enrolled your team as technical guide for ${mentorReq.project}!`)}
                  className="w-full mt-2 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
                >
                  Volunteer Industry Expert Guide
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Statewide CSR Analytics */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Statewide Corporate Social Responsibility (CSR) Allocation
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Transparent breakdown of corporate capital pledged to Jharkhand higher education projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">District Deployment</h3>
              <div className="space-y-3 text-xs">
                {[
                  { district: "Khunti (Arsenic Water)", amount: "₹4,50,000", pct: 20 },
                  { district: "Dhanbad (Slurry & Waste)", amount: "₹6,10,000", pct: 27 },
                  { district: "Latehar (Maternal Health)", amount: "₹5,20,000", pct: 23 },
                  { district: "Giridih (Agri Cold Storage)", amount: "₹3,80,000", pct: 17 },
                  { district: "Simdega (Digital School)", amount: "₹3,00,000", pct: 13 },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">{item.district}</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{item.amount}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.pct * 3}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Support Modality Ratio</h3>
              <div className="space-y-3 text-xs">
                {[
                  { mode: "Direct Research Grants", share: "52%" },
                  { mode: "Testing Lab & Hardware", share: "24%" },
                  { mode: "Cloud API & Compute Access", share: "14%" },
                  { mode: "Field Deployment Assistance", share: "10%" },
                ].map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{m.mode}</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">{m.share}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Audit & ESG Compliance</h3>
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-200">
                  <CheckCircle2 className="w-4 h-4" /> 100% MCA CSR Compliant
                </div>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-300 leading-relaxed">
                  All funds qualify under Schedule VII of the Companies Act (Promoting education, healthcare, rural water sanitation, and technological incubators).
                </p>
              </div>
              <button
                onClick={() => showToast("Exporting ESG Social Impact Verification Report (PDF)...")}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition"
              >
                Download ESG Verification Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Support / Partnership Offer Modal */}
      <AnimatePresence>
        {isSupportModalOpen && selectedTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <button
                onClick={() => setIsSupportModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    Corporate CSR Commitment
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
                    Offer Support / Partnership
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Target: <strong className="text-slate-800 dark:text-slate-200">{selectedTarget.title}</strong>
                  </p>
                </div>

                <form onSubmit={handleCommitSupport} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Select Support Types Offered:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["FUNDING", "MENTORSHIP", "TECHNOLOGY", "INFRASTRUCTURE", "TESTING"].map((type) => {
                        const isChecked = supportTypes.includes(type);
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => toggleSupportType(type)}
                            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition ${
                              isChecked
                                ? "bg-purple-50 text-purple-700 border-purple-300 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800"
                                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                            }`}
                          >
                            <span
                              className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] font-bold ${
                                isChecked ? "bg-purple-600 text-white" : "border border-slate-300"
                              }`}
                            >
                              {isChecked && "✓"}
                            </span>
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Funding Amount Pledged:
                    </label>
                    <input
                      type="text"
                      value={pledgedAmount}
                      onChange={(e) => setPledgedAmount(e.target.value)}
                      placeholder="e.g. ₹4,50,000"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-none font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Support Details / Scope of Sponsorship:
                    </label>
                    <textarea
                      rows={3}
                      value={supportNote}
                      onChange={(e) => setSupportNote(e.target.value)}
                      placeholder="Specify hardware sensors provided, mentor availability, cloud credits, or field deployment assistance..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Contact Officer</label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Official Email</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-lg transition"
                  >
                    Confirm & Dispatch CSR Partnership Agreement
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
