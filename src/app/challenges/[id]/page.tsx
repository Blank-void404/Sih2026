"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin, Calendar, Users, Flame, CheckCircle2, Clock,
  ArrowRight, ArrowLeft, Shield, FileText, Camera,
  AlertTriangle, Cpu, Building2, GraduationCap, Tag,
  ExternalLink, ChevronRight, Info, Zap, Target,
  Droplets, Wheat, HeartPulse, TreePine
} from "lucide-react";

// Extended challenge data for detail pages
interface ChallengeDetail {
  id: string;
  title: string;
  description: string;
  district: string;
  gps_location: string;
  category: string;
  status: string;
  upvotes: number;
  teams_count: number;
  created_at: string;
  tags: string[];
  reported_by: string;
  ai_domain: string;
  ai_priority: string;
  ai_severity: number;
  ai_skills_required: string[];
  funding_needed: string;
  // Extended fields
  people_affected: string;
  date_verified: string;
  verification_authority: string;
  expected_outcome: string;
  evidence: Evidence[];
  statusTimeline: StatusStep[];
}

interface Evidence {
  type: "photo" | "report" | "survey" | "measurement";
  title: string;
  description: string;
  date: string;
}

interface StatusStep {
  label: string;
  status: "completed" | "current" | "pending";
  date?: string;
}

const CHALLENGES_DB: Record<string, ChallengeDetail> = {
  "jh-ch-01": {
    id: "jh-ch-01",
    title: "Borewell Arsenic & Heavy Metal Filtration in Khunti Blocks",
    description: "Over 42 tribal hamlets in Khunti and Murhu blocks face toxic levels of arsenic and fluoride in borewell water. Lack of low-maintenance, chemical-free community filtration systems causes severe fluorosis among children. The WHO permissible limit for arsenic (10 µg/L) is exceeded by 3-8x in tested samples. Children under 10 show dental and skeletal fluorosis symptoms. Community hand pumps installed by PHE department in 2019 have no filtration capability.",
    district: "Khunti",
    gps_location: "23.0725° N, 85.2789° E",
    category: "Water & Sanitation",
    status: "IN_PROGRESS",
    upvotes: 438,
    teams_count: 3,
    created_at: "2026-08-28T10:00:00Z",
    tags: ["Arsenic", "Water Purification", "Borewell", "Tribal Health"],
    reported_by: "Birsa Gram Vikas Samiti",
    ai_domain: "Environmental Engineering & IoT",
    ai_priority: "Critical",
    ai_severity: 9,
    ai_skills_required: ["Hydrogeology", "Bio-adsorption Filters", "Solar Pump Integration"],
    funding_needed: "₹4,50,000",
    people_affected: "~18,000 residents across 42 hamlets",
    date_verified: "2026-09-02",
    verification_authority: "Block Development Officer, Khunti",
    expected_outcome: "Safe drinking water (within WHO limits) for all 42 hamlets via low-cost community filters",
    evidence: [
      { type: "measurement", title: "Water Quality Lab Report (NABL Certified)", description: "Arsenic: 38-82 µg/L (Limit: 10 µg/L). Fluoride: 2.8-6.1 mg/L (Limit: 1.5 mg/L). Tested across 15 borewells.", date: "2026-08-15" },
      { type: "photo", title: "Dental fluorosis in children (Age 6-12)", description: "Photographic evidence showing mottled enamel and brown staining in children of Murhu block primary school.", date: "2026-08-20" },
      { type: "survey", title: "Household Water Source Survey", description: "Door-to-door survey of 2,400 households. 91% depend solely on untested borewells. 0% have access to RO/filter.", date: "2026-07-10" },
      { type: "report", title: "PHE Department Installation Records", description: "Records show 67 hand pumps installed in 2019 with no filtration stage. No maintenance since 2021.", date: "2026-06-01" },
    ],
    statusTimeline: [
      { label: "Reported", status: "completed", date: "2026-08-28" },
      { label: "Under Verification", status: "completed", date: "2026-08-30" },
      { label: "Verified", status: "completed", date: "2026-09-02" },
      { label: "Open for Solutions", status: "completed", date: "2026-09-03" },
      { label: "Team Formed", status: "completed", date: "2026-09-05" },
      { label: "Prototype", status: "current" },
      { label: "Field Testing", status: "pending" },
      { label: "Deployed", status: "pending" },
    ],
  },
  "jh-ch-02": {
    id: "jh-ch-02",
    title: "Underground Coal Fire Smoke Suppression & Early Warning in Jharia",
    description: "Subsurface coal seams continue burning across Jharia mining zones, emitting carbon monoxide and sulphur dioxide. Local residents need affordable low-cost air quality alert sensors and localized suppression barriers. Over 70 active fire zones documented since 1916. Toxic gas emissions exceed NAAQS limits by 4-12x during winter inversions.",
    district: "Dhanbad",
    gps_location: "23.7441° N, 86.4131° E",
    category: "Forest & Environment",
    status: "RECOMMENDED",
    upvotes: 620,
    teams_count: 4,
    created_at: "2026-08-20T14:30:00Z",
    tags: ["Coal Fires", "Air Quality", "IoT Sensors", "Mining Safety"],
    reported_by: "Dhanbad Environmental Action Cell",
    ai_domain: "IoT & Thermal Geospatial Mapping",
    ai_priority: "Critical",
    ai_severity: 10,
    ai_skills_required: ["Thermal Drone Imaging", "Sensor Mesh Networks", "Hazard Modeling"],
    funding_needed: "₹8,00,000",
    people_affected: "~2,00,000 residents in Jharia coalfield zone",
    date_verified: "2026-08-25",
    verification_authority: "District Mining Officer, Dhanbad",
    expected_outcome: "Real-time air quality alerting and emergency evacuation system for affected zones",
    evidence: [
      { type: "measurement", title: "CPCB Air Quality Index Report", description: "CO: 14-28 mg/m³ (Limit: 4 mg/m³). SO₂: 180-420 µg/m³ (Limit: 80 µg/m³). PM2.5: 280-500 µg/m³.", date: "2026-08-10" },
      { type: "photo", title: "Surface crack smoke emission zones", description: "Thermal and visible-light images showing active smoke vents along Kusunda-Lodna road corridor.", date: "2026-08-18" },
      { type: "report", title: "BCCL Fire Zone Mapping Report", description: "Bharat Coking Coal Ltd documented 73 active subsurface fire zones with surface temperature >65°C.", date: "2026-07-20" },
    ],
    statusTimeline: [
      { label: "Reported", status: "completed", date: "2026-08-20" },
      { label: "Under Verification", status: "completed", date: "2026-08-22" },
      { label: "Verified", status: "completed", date: "2026-08-25" },
      { label: "Open for Solutions", status: "current" },
      { label: "Team Formed", status: "pending" },
      { label: "Prototype", status: "pending" },
      { label: "Field Testing", status: "pending" },
      { label: "Deployed", status: "pending" },
    ],
  },
  "jh-ch-08": {
    id: "jh-ch-08",
    title: "Industrial Acid Effluent Real-Time Sensor Alert on Subarnarekha River",
    description: "Unregulated discharge of industrial metal plating effluents into the Subarnarekha River kills aquatic life and affects downstream farming in Tupudana and Namkum. Real-time water probe monitoring is required. Fish mortality events have increased 3x in the past year. Agricultural yields in downstream Namkum farms have dropped 22% due to contaminated irrigation water.",
    district: "Ranchi",
    gps_location: "23.3441° N, 85.3096° E",
    category: "Water & Sanitation",
    status: "RECOMMENDED",
    upvotes: 492,
    teams_count: 1,
    created_at: "2026-08-30T17:00:00Z",
    tags: ["River Pollution", "Effluent Monitoring", "Water Quality", "Industrial Waste"],
    reported_by: "Subarnarekha Bachao Samiti",
    ai_domain: "Environmental Sensing & Geo-Telemetry",
    ai_priority: "Critical",
    ai_severity: 9,
    ai_skills_required: ["Chemical Electro-sensors", "Water Quality Analytics", "LoRaWAN"],
    funding_needed: "₹3,90,000",
    people_affected: "~35,000 residents and 1,200 farming families",
    date_verified: "2026-09-03",
    verification_authority: "Jharkhand State Pollution Control Board",
    expected_outcome: "24/7 real-time effluent discharge monitoring with automated regulatory alerts",
    evidence: [
      { type: "measurement", title: "JSPCB River Water Analysis", description: "pH: 3.2-4.8 (Normal: 6.5-8.5). Heavy metals: Chromium 0.42 mg/L (Limit: 0.05 mg/L). Lead 0.18 mg/L (Limit: 0.01 mg/L).", date: "2026-08-25" },
      { type: "photo", title: "Fish mortality near discharge point", description: "Photographic evidence of mass fish die-off near industrial cluster at Tupudana. Estimated 500+ dead fish.", date: "2026-08-22" },
      { type: "survey", title: "Farmer Impact Assessment", description: "Survey of 340 farming households. 78% report crop discoloration. 45% report skin irritation from irrigation water.", date: "2026-08-01" },
    ],
    statusTimeline: [
      { label: "Reported", status: "completed", date: "2026-08-30" },
      { label: "Under Verification", status: "completed", date: "2026-09-01" },
      { label: "Verified", status: "completed", date: "2026-09-03" },
      { label: "Open for Solutions", status: "current" },
      { label: "Team Formed", status: "pending" },
      { label: "Prototype", status: "pending" },
      { label: "Field Testing", status: "pending" },
      { label: "Deployed", status: "pending" },
    ],
  },
};

// Generate detail data for any challenge ID not in the DB
function getChallengeDetail(id: string): ChallengeDetail | null {
  if (CHALLENGES_DB[id]) return CHALLENGES_DB[id];

  // For other IDs, generate a reasonable default
  const defaultChallenges: Record<string, Partial<ChallengeDetail>> = {
    "jh-ch-03": {
      title: "Decentralized Solar Cold Storage for Perishable Vegetables",
      description: "Smallholder farmers growing tomatoes and cauliflower in Tisri and Gawan blocks suffer 40% post-harvest rot during transit due to erratic grid power. A portable thermal battery cold room is needed.",
      district: "Giridih", category: "Renewable Energy", status: "IN_PROGRESS", ai_priority: "High", ai_severity: 8,
      people_affected: "~5,000 farming families", reported_by: "Giridih Kisan Utthan Producer Co.",
      gps_location: "24.1868° N, 86.3039° E", ai_domain: "Renewable Energy & Thermal Storage",
      ai_skills_required: ["Phase Change Materials", "Solar PV Systems", "Embedded Microcontrollers"],
      funding_needed: "₹3,20,000", tags: ["Solar Cold Room", "Post-Harvest", "Clean Energy", "Agri-Tech"],
    },
    "jh-ch-04": {
      title: "AI Elephant Corridor Detection to Prevent Human-Wildlife Conflict",
      description: "In the dense Saranda forest belt of West Singhbhum, wild elephant herds frequently cross into agrarian villages, leading to fatal encounters and crop loss.",
      district: "West Singhbhum", category: "Forest & Environment", status: "IN_PROGRESS", ai_priority: "Critical", ai_severity: 9,
      people_affected: "~12,000 residents in forest fringe villages", reported_by: "Saranda Van Suraksha Samiti",
      gps_location: "22.2575° N, 85.3400° E", ai_domain: "Computer Vision & Edge AI",
      ai_skills_required: ["Edge AI Camera traps", "LoRaWAN Transceivers", "Audio Spectrogram ML"],
      funding_needed: "₹5,00,000", tags: ["Wildlife Conservation", "Elephant Corridors", "Edge AI"],
    },
    "jh-ch-05": {
      title: "Maternal Anemia & Malnutrition Supply Tracking in Latehar & Gumla",
      description: "Over 65% of pregnant women in remote Latehar forest pockets suffer from severe anemia. Anganwadi iron supplements frequently experience delivery stockouts.",
      district: "Latehar", category: "Healthcare & Nutrition", status: "IN_PROGRESS", ai_priority: "High", ai_severity: 8,
      people_affected: "~25,000 pregnant women and infants", reported_by: "Jharkhand Women & Child Health Collective",
      gps_location: "23.7431° N, 84.4984° E", ai_domain: "Health Informatics & Predictive Logistics",
      ai_skills_required: ["Offline-first PWA", "SMS Gateway Integration", "Inventory Optimization"],
      funding_needed: "₹2,50,000", tags: ["Maternal Health", "Anemia", "Supply Chain"],
    },
    "jh-ch-06": {
      title: "Solar-Powered Processing & Deseeding Machine for Mahua Flowers",
      description: "Tribal women collectors spend 6–8 hours manually drying and destoning forest Mahua and Chironji fruits, resulting in low sale margins to middlemen.",
      district: "Gumla", category: "Agriculture & Soil", status: "RECOMMENDED", ai_priority: "Medium", ai_severity: 6,
      people_affected: "~3,000 tribal women collectors", reported_by: "Mahila Vanopaj Mandali Gumla",
      gps_location: "23.0427° N, 84.5422° E", ai_domain: "Mechanical Design & Rural Engineering",
      ai_skills_required: ["Low-Cost Mechanical Design", "Solar Thermal Drying", "Ergonomics"],
      funding_needed: "₹1,80,000", tags: ["Forest Produce", "Mahua Processing", "Women SHGs"],
    },
    "jh-ch-07": {
      title: "Solar-Powered Mesh Micro-Cloud for Remote Digital Classrooms",
      description: "More than 35 government secondary schools in forested Simdega have no cellular coverage. Students lack access to video lectures, interactive STEM labs, and NCERT digital simulations.",
      district: "Simdega", category: "Education & Skills", status: "IN_PROGRESS", ai_priority: "High", ai_severity: 7,
      people_affected: "~8,000 students across 35 schools", reported_by: "Vidyalaya Sahayog Manch",
      gps_location: "22.6158° N, 84.5097° E", ai_domain: "Decentralized Networks & EdTech",
      ai_skills_required: ["Linux Microservers", "Wi-Fi Hotspot Caching", "Interactive Web Apps"],
      funding_needed: "₹2,20,000", tags: ["Digital Divide", "Raspberry Pi", "Offline E-Learning"],
    },
  };

  const base = defaultChallenges[id];
  if (!base) return null;

  return {
    id,
    title: base.title || "Challenge",
    description: base.description || "",
    district: base.district || "Ranchi",
    gps_location: base.gps_location || "23.3° N, 85.3° E",
    category: base.category || "Rural Infrastructure",
    status: base.status || "RECOMMENDED",
    upvotes: Math.floor(Math.random() * 300) + 100,
    teams_count: Math.floor(Math.random() * 3) + 1,
    created_at: "2026-08-15T10:00:00Z",
    tags: base.tags || ["Innovation", "Technology"],
    reported_by: base.reported_by || "Registered Citizen",
    ai_domain: base.ai_domain || "Applied Technology",
    ai_priority: base.ai_priority || "High",
    ai_severity: base.ai_severity || 7,
    ai_skills_required: base.ai_skills_required || ["System Design", "Engineering"],
    funding_needed: base.funding_needed || "₹2,00,000",
    people_affected: base.people_affected || "Community scale",
    date_verified: "2026-09-01",
    verification_authority: "Block Development Officer",
    expected_outcome: "Field-tested prototype solution addressing core problem",
    evidence: [
      { type: "survey", title: "Community Impact Survey", description: "Field survey conducted covering affected population and infrastructure.", date: "2026-08-10" },
      { type: "photo", title: "Site Documentation", description: "Photographic evidence from field visit by reporting organization.", date: "2026-08-12" },
      { type: "report", title: "Government Records", description: "Relevant department records and prior intervention documentation.", date: "2026-07-15" },
    ],
    statusTimeline: [
      { label: "Reported", status: "completed", date: "2026-08-15" },
      { label: "Under Verification", status: "completed", date: "2026-08-20" },
      { label: "Verified", status: "completed", date: "2026-09-01" },
      { label: "Open for Solutions", status: base.status === "IN_PROGRESS" ? "completed" : "current" },
      { label: "Team Formed", status: base.status === "IN_PROGRESS" ? "current" : "pending" },
      { label: "Prototype", status: "pending" },
      { label: "Field Testing", status: "pending" },
      { label: "Deployed", status: "pending" },
    ],
  };
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "Water & Sanitation": Droplets,
  "Renewable Energy": Zap,
  "Agriculture & Soil": Wheat,
  "Healthcare & Nutrition": HeartPulse,
  "Education & Skills": GraduationCap,
  "Forest & Environment": TreePine,
  "Rural Infrastructure": Building2,
};

const EVIDENCE_ICONS: Record<string, React.ElementType> = {
  photo: Camera,
  report: FileText,
  survey: Users,
  measurement: Target,
};

export default function ChallengeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [challenge, setChallenge] = useState<ChallengeDetail | null>(null);

  useEffect(() => {
    setChallenge(getChallengeDetail(id));
  }, [id]);

  if (!challenge) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-900">Challenge Not Found</h2>
          <p className="text-slate-600">The challenge ID &quot;{id}&quot; does not exist in our registry.</p>
          <Link href="/explore" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition">
            <ArrowLeft className="w-4 h-4" /> Back to Challenges
          </Link>
        </div>
      </div>
    );
  }

  const CatIcon = CATEGORY_ICONS[challenge.category] || Building2;

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Prototype Data Disclaimer */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
        <Info className="w-4 h-4 flex-shrink-0" />
        <span>Prototype Demonstration Data — This is sample data for SIH 2026 prototype demonstration purposes.</span>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-emerald-600 transition">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/explore" className="hover:text-emerald-600 transition">Challenges</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 font-semibold truncate max-w-[200px]">{challenge.title}</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
            <CatIcon className="w-3.5 h-3.5" />
            {challenge.category}
          </span>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
            challenge.ai_priority === "Critical" ? "bg-rose-100 text-rose-800 border border-rose-200" :
            challenge.ai_priority === "High" ? "bg-amber-100 text-amber-800 border border-amber-200" :
            "bg-emerald-100 text-emerald-800 border border-emerald-200"
          }`}>
            <Flame className="w-3 h-3" />
            {challenge.ai_priority} Priority
          </span>
          <span className="text-xs text-slate-500 font-mono bg-slate-50 px-2 py-1 rounded border border-slate-200">
            ID: {challenge.id.toUpperCase()}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-serif leading-tight tracking-tight">
          {challenge.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-600" />
            {challenge.district}, Jharkhand ({challenge.gps_location})
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400" />
            Reported: {new Date(challenge.created_at).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-blue-500" />
            {challenge.people_affected}
          </span>
        </div>
      </motion.div>

      {/* Status Pipeline */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
      >
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          Challenge Status Pipeline
        </h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 overflow-x-auto pb-2">
          {challenge.statusTimeline.map((step, idx) => (
            <div key={step.label} className="flex items-center gap-0 flex-shrink-0">
              <div className="flex flex-col items-center text-center min-w-[90px]">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  step.status === "completed" ? "bg-emerald-500 text-white" :
                  step.status === "current" ? "bg-amber-500 text-white ring-4 ring-amber-100" :
                  "bg-slate-200 text-slate-500"
                }`}>
                  {step.status === "completed" ? <CheckCircle2 className="w-4 h-4" /> :
                   step.status === "current" ? <Clock className="w-4 h-4" /> :
                   idx + 1}
                </div>
                <span className={`text-[10px] mt-1.5 font-semibold leading-tight ${
                  step.status === "completed" ? "text-emerald-700" :
                  step.status === "current" ? "text-amber-700" :
                  "text-slate-400"
                }`}>{step.label}</span>
                {step.date && <span className="text-[9px] text-slate-400">{step.date}</span>}
              </div>
              {idx < challenge.statusTimeline.length - 1 && (
                <div className={`hidden sm:block w-8 h-0.5 ${
                  step.status === "completed" ? "bg-emerald-400" : "bg-slate-200"
                }`} />
              )}
            </div>
          ))}
        </div>
      </motion.section>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Problem Description */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
          >
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#D9531E]" />
              Problem Description
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {challenge.description}
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">People Affected</span>
                <span className="text-sm font-bold text-slate-900">{challenge.people_affected}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Expected Outcome</span>
                <span className="text-sm font-bold text-slate-900">{challenge.expected_outcome}</span>
              </div>
            </div>
          </motion.section>

          {/* Evidence Section */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
          >
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#D9531E]" />
              Evidence & Documentation
            </h3>
            <div className="space-y-3">
              {challenge.evidence.map((ev, idx) => {
                const EvIcon = EVIDENCE_ICONS[ev.type] || FileText;
                return (
                  <div key={idx} className="flex gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 transition">
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                      <EvIcon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900">{ev.title}</span>
                        <span className="text-[10px] text-slate-400 px-1.5 py-0.5 bg-white rounded border border-slate-200 capitalize">{ev.type}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{ev.description}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Collected: {ev.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* AI Analysis */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-gradient-to-br from-indigo-50 via-purple-50/30 to-slate-50 rounded-2xl p-6 border border-indigo-100 shadow-sm space-y-4"
          >
            <h3 className="text-sm font-bold text-indigo-800 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              AI-Assisted Classification
              <span className="text-[9px] px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full border border-indigo-200 font-bold">PROTOTYPE</span>
            </h3>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-xl border border-indigo-100">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Domain</span>
                <span className="text-sm font-bold text-slate-900">{challenge.ai_domain}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-indigo-100">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Severity</span>
                <span className="text-sm font-bold text-slate-900">{challenge.ai_severity}/10</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-indigo-100">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Est. Grant</span>
                <span className="text-sm font-bold text-emerald-700">{challenge.funding_needed}</span>
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-600 block mb-2">Required Skills:</span>
              <div className="flex flex-wrap gap-1.5">
                {challenge.ai_skills_required.map(skill => (
                  <span key={skill} className="px-2.5 py-1 rounded-lg bg-white text-xs font-medium text-indigo-700 border border-indigo-100">{skill}</span>
                ))}
              </div>
            </div>
          </motion.section>
        </div>

        {/* Sidebar (1/3) */}
        <div className="space-y-6">
          {/* Verification Panel */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-bold text-emerald-800">✓ Verified Challenge</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Verified By</span>
                <span className="font-semibold text-slate-800">{challenge.verification_authority}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date Verified</span>
                <span className="font-semibold text-slate-800">{challenge.date_verified}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Reported By</span>
                <span className="font-semibold text-slate-800">{challenge.reported_by}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3"
          >
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Community Signals</h4>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-slate-600"><Flame className="w-4 h-4 text-amber-500" /> Upvotes</span>
              <span className="font-bold text-slate-900">{challenge.upvotes}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-slate-600"><Users className="w-4 h-4 text-blue-500" /> Teams Working</span>
              <span className="font-bold text-slate-900">{challenge.teams_count}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-slate-600"><Tag className="w-4 h-4 text-purple-500" /> Tags</span>
              <span className="font-bold text-slate-900">{challenge.tags.length}</span>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm"
          >
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Tags</h4>
            <div className="flex flex-wrap gap-1.5">
              {challenge.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-50 text-xs font-medium text-slate-600 border border-slate-200">{tag}</span>
              ))}
            </div>
          </motion.div>

          {/* CTA: Solve This Challenge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <Link
              href={`/challenges/${id}/apply`}
              className="block w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm text-center shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Target className="w-4 h-4" />
              Solve This Challenge
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard/industry"
              className="block w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm text-center transition-all flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              Pledge Industry Support
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
