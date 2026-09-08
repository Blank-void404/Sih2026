"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Users, GraduationCap,
  Target, Clock, Lightbulb, Plus, X, Info
} from "lucide-react";

export default function ApplyToSolvePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [step, setStep] = useState<"form" | "success">("form");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    teamName: "",
    university: "",
    leaderName: "",
    leaderEmail: "",
    leaderBranch: "",
    projectIdea: "",
    timeline: "3 months",
    members: [{ name: "", branch: "", role: "" }],
  });

  const challengeInfo: Record<string, { title: string; skills: string[]; team: string }> = {
    "jh-ch-01": { title: "Borewell Arsenic & Heavy Metal Filtration in Khunti Blocks", skills: ["Hydrogeology", "Bio-adsorption Filters", "Solar Pump Integration", "IoT Sensors"], team: "4-5 members: 1 Environmental Engineer, 1 IoT Developer, 1 Chemical Engineer, 1 Field Researcher" },
    "jh-ch-02": { title: "Underground Coal Fire Smoke Suppression & Early Warning", skills: ["Thermal Drone Imaging", "Sensor Mesh Networks", "Hazard Modeling"], team: "4-6 members: 1 Geospatial Analyst, 1 IoT Engineer, 1 Drone Operator, 1 Environmental Scientist" },
    "jh-ch-03": { title: "Decentralized Solar Cold Storage for Perishable Vegetables", skills: ["Phase Change Materials", "Solar PV Systems", "Embedded Microcontrollers"], team: "3-5 members: 1 Thermal Engineer, 1 Solar PV Specialist, 1 Embedded Systems Developer" },
    "jh-ch-04": { title: "AI Elephant Corridor Detection", skills: ["Edge AI Camera traps", "LoRaWAN Transceivers", "Audio Spectrogram ML"], team: "4-5 members: 1 ML Engineer, 1 Hardware Developer, 1 Wildlife Researcher, 1 Field Coordinator" },
    "jh-ch-05": { title: "Maternal Anemia Supply Tracking in Latehar & Gumla", skills: ["Offline-first PWA", "SMS Gateway Integration", "Inventory Optimization"], team: "3-4 members: 1 Mobile Developer, 1 Backend Engineer, 1 Public Health Researcher" },
    "jh-ch-06": { title: "Solar-Powered Mahua Processing Machine", skills: ["Low-Cost Mechanical Design", "Solar Thermal Drying", "Ergonomics"], team: "3-4 members: 1 Mechanical Designer, 1 Solar Engineer, 1 Field Tester" },
    "jh-ch-07": { title: "Solar-Powered Mesh Micro-Cloud for Digital Classrooms", skills: ["Linux Microservers", "Wi-Fi Hotspot Caching", "Interactive Web Apps"], team: "3-5 members: 1 System Administrator, 1 Web Developer, 1 Content Creator, 1 Hardware Engineer" },
    "jh-ch-08": { title: "Industrial Acid Effluent Sensor Alert on Subarnarekha River", skills: ["Chemical Electro-sensors", "Water Quality Analytics", "LoRaWAN"], team: "4-5 members: 1 Chemical Sensor Specialist, 1 IoT Developer, 1 Data Analyst, 1 Environmental Engineer" },
  };

  const info = challengeInfo[id] || { title: `Challenge ${id}`, skills: ["System Design", "Engineering"], team: "3-5 members across relevant disciplines" };

  const addMember = () => {
    setFormData(prev => ({
      ...prev,
      members: [...prev.members, { name: "", branch: "", role: "" }],
    }));
  };

  const removeMember = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== idx),
    }));
  };

  const updateMember = (idx: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.map((m, i) => i === idx ? { ...m, [field]: value } : m),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 2000));
    setSubmitting(false);
    setStep("success");
  };

  if (step === "success") {
    const applicationId = `APP-${id.toUpperCase()}-${Date.now().toString().slice(-4)}`;
    return (
      <div className="max-w-2xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg text-center space-y-6"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 font-serif">Application Submitted!</h1>
            <p className="text-slate-600 mt-2">Your team application for this challenge has been received.</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Application ID</span>
              <span className="font-mono font-bold text-slate-900">{applicationId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Challenge</span>
              <span className="font-semibold text-slate-900 text-right max-w-[220px] truncate">{info.title}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Team</span>
              <span className="font-semibold text-slate-900">{formData.teamName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">University</span>
              <span className="font-semibold text-slate-900">{formData.university}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Status</span>
              <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-xs">Under Review</span>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-sm text-emerald-800 text-left">
            <strong>Next Steps:</strong>
            <ul className="mt-2 space-y-1 text-xs list-disc list-inside">
              <li>Your application will be reviewed by the university coordination team.</li>
              <li>A faculty mentor will be assigned if your application is approved.</li>
              <li>You will be notified via email once the team is confirmed.</li>
              <li>Challenge status will update to &quot;Team Formed&quot; on the platform.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href={`/challenges/${id}`} className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl font-bold text-sm text-center transition">
              ← Back to Challenge
            </Link>
            <Link href="/explore" className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm text-center transition">
              Explore More Challenges
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Prototype Disclaimer */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
        <Info className="w-4 h-4 flex-shrink-0" />
        <span>Prototype Demonstration — This form demonstrates the team application workflow for SIH 2026.</span>
      </div>

      {/* Back nav */}
      <Link href={`/challenges/${id}`} className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 transition font-semibold">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Challenge
      </Link>

      <div className="space-y-2">
        <h1 className="text-2xl font-black text-slate-900 font-serif">Solve This Challenge</h1>
        <p className="text-sm text-slate-600">Apply with your team to work on: <strong className="text-slate-900">{info.title}</strong></p>
      </div>

      {/* Challenge Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4"
      >
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-600" /> Challenge Requirements
        </h3>
        <div>
          <span className="text-xs font-semibold text-slate-500 block mb-2">Required Skills:</span>
          <div className="flex flex-wrap gap-1.5">
            {info.skills.map(skill => (
              <span key={skill} className="px-2.5 py-1 rounded-lg bg-indigo-50 text-xs font-medium text-indigo-700 border border-indigo-100">{skill}</span>
            ))}
          </div>
        </div>
        <div>
          <span className="text-xs font-semibold text-slate-500 block mb-1">Recommended Team Composition:</span>
          <p className="text-sm text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">{info.team}</p>
        </div>
      </motion.div>

      {/* Application Form */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6"
      >
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-600" /> Team Application
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Team Name *</label>
            <input required type="text" value={formData.teamName} onChange={e => setFormData(prev => ({ ...prev, teamName: e.target.value }))}
              placeholder="e.g., AquaGuard Innovators"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">University *</label>
            <select required value={formData.university} onChange={e => setFormData(prev => ({ ...prev, university: e.target.value }))}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white text-sm">
              <option value="">Select university...</option>
              <option>BIT Mesra</option>
              <option>IIT (ISM) Dhanbad</option>
              <option>Birsa Agricultural University (BAU) Kanke</option>
              <option>Ranchi University</option>
              <option>AIIMS Deoghar</option>
              <option>Kolhan University</option>
              <option>NIT Jamshedpur</option>
              <option>Central University of Jharkhand</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Team Leader Name *</label>
            <input required type="text" value={formData.leaderName} onChange={e => setFormData(prev => ({ ...prev, leaderName: e.target.value }))}
              placeholder="Full name"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Team Leader Email *</label>
            <input required type="email" value={formData.leaderEmail} onChange={e => setFormData(prev => ({ ...prev, leaderEmail: e.target.value }))}
              placeholder="email@university.ac.in"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm" />
          </div>
        </div>

        {/* Team Members */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">Team Members</label>
            <button type="button" onClick={addMember} className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition">
              <Plus className="w-3.5 h-3.5" /> Add Member
            </button>
          </div>
          {formData.members.map((member, idx) => (
            <div key={idx} className="flex gap-2 items-start bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="flex-1 grid grid-cols-3 gap-2">
                <input type="text" placeholder="Name" value={member.name} onChange={e => updateMember(idx, "name", e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" />
                <input type="text" placeholder="Branch" value={member.branch} onChange={e => updateMember(idx, "branch", e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" />
                <input type="text" placeholder="Role" value={member.role} onChange={e => updateMember(idx, "role", e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              {formData.members.length > 1 && (
                <button type="button" onClick={() => removeMember(idx)} className="p-1.5 text-slate-400 hover:text-rose-500 transition">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Solution Proposal */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Solution Proposal *</label>
          <textarea required rows={4} value={formData.projectIdea} onChange={e => setFormData(prev => ({ ...prev, projectIdea: e.target.value }))}
            placeholder="Describe your proposed approach, key technologies, and expected outcomes..."
            className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm resize-y" />
        </div>

        {/* Timeline */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Expected Timeline</label>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <select value={formData.timeline} onChange={e => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
              className="px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white text-sm">
              <option>1 month</option>
              <option>2 months</option>
              <option>3 months</option>
              <option>6 months</option>
              <option>12 months</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-70 flex items-center gap-2 shadow-lg shadow-emerald-600/20"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting Application...
              </>
            ) : (
              <>
                Submit Application
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
