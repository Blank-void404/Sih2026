"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  MapPin,
  Clock,
  Tag,
  Users,
  Flame,
  CheckCircle2,
  Loader2,
  Filter,
  X,
  ArrowRight,
  Droplets,
  Zap,
  Wheat,
  HeartPulse,
  GraduationCap,
  TreePine,
  Sparkles,
  ExternalLink,
  Building2,
  AlertCircle,
  Share2,
  PlusCircle,
  TrendingUp,
  Cpu
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Status = "SUBMITTED" | "ANALYZING" | "RECOMMENDED" | "ACCEPTED" | "IN_PROGRESS" | "COMPLETED";

type Category =
  | "Water & Sanitation"
  | "Renewable Energy"
  | "Agriculture & Soil"
  | "Healthcare & Nutrition"
  | "Education & Skills"
  | "Forest & Environment"
  | "Rural Infrastructure";

interface Challenge {
  id: string;
  title: string;
  description: string;
  district: string;
  gps_location?: string;
  category: Category;
  status: Status;
  upvotes: number;
  teams_count: number;
  created_at: string;
  tags: string[];
  reported_by: string;
  ai_domain: string;
  ai_priority: "Low" | "Medium" | "High" | "Critical";
  ai_severity: number; // 1 - 10
  ai_skills_required: string[];
  funding_needed?: string;
}

const CATEGORY_CONFIG: Record<Category, { icon: React.ElementType; color: string; badgeBg: string }> = {
  "Water & Sanitation": {
    icon: Droplets,
    color: "text-blue-600 dark:text-blue-400",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-900",
  },
  "Renewable Energy": {
    icon: Zap,
    color: "text-amber-600 dark:text-amber-400",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900",
  },
  "Agriculture & Soil": {
    icon: Wheat,
    color: "text-emerald-600 dark:text-emerald-400",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-900",
  },
  "Healthcare & Nutrition": {
    icon: HeartPulse,
    color: "text-rose-600 dark:text-rose-400",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-900",
  },
  "Education & Skills": {
    icon: GraduationCap,
    color: "text-purple-600 dark:text-purple-400",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-900",
  },
  "Forest & Environment": {
    icon: TreePine,
    color: "text-teal-600 dark:text-teal-400",
    badgeBg: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-900",
  },
  "Rural Infrastructure": {
    icon: Building2,
    color: "text-orange-600 dark:text-orange-400",
    badgeBg: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-900",
  },
};

const STATUS_CONFIG: Record<Status, { label: string; color: string; dotColor: string }> = {
  SUBMITTED: { label: "Submitted", color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300", dotColor: "bg-slate-400" },
  ANALYZING: { label: "AI Analyzing", color: "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300", dotColor: "bg-purple-500" },
  RECOMMENDED: { label: "Ready for Adoption", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300", dotColor: "bg-indigo-500" },
  ACCEPTED: { label: "Team Assigned", color: "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300", dotColor: "bg-blue-500" },
  IN_PROGRESS: { label: "In Progress", color: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300", dotColor: "bg-amber-500" },
  COMPLETED: { label: "Resolved", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300", dotColor: "bg-emerald-500" },
};

const SAMPLE_CHALLENGES: Challenge[] = [
  {
    id: "jh-ch-01",
    title: "Borewell Arsenic & Heavy Metal Filtration in Khunti Blocks",
    description:
      "Over 42 tribal hamlets in Khunti and Murhu blocks face toxic levels of arsenic and fluoride in borewell water. Lack of low-maintenance, chemical-free community filtration systems causes severe fluorosis among children.",
    district: "Khunti",
    gps_location: "23.0725° N, 85.2789° E",
    category: "Water & Sanitation",
    status: "IN_PROGRESS",
    upvotes: 438,
    teams_count: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    tags: ["Arsenic", "Water Purification", "Borewell", "Tribal Health"],
    reported_by: "Birsa Gram Vikas Samiti",
    ai_domain: "Environmental Engineering & IoT",
    ai_priority: "Critical",
    ai_severity: 9,
    ai_skills_required: ["Hydrogeology", "Bio-adsorption Filters", "Solar Pump Integration"],
    funding_needed: "₹4,50,000",
  },
  {
    id: "jh-ch-02",
    title: "Underground Coal Fire Smoke Suppression & Early Warning in Jharia",
    description:
      "Subsurface coal seams continue burning across Jharia mining zones, emitting carbon monoxide and sulphur dioxide. Local residents need affordable low-cost air quality alert sensors and localized suppression barriers.",
    district: "Dhanbad",
    gps_location: "23.7441° N, 86.4131° E",
    category: "Forest & Environment",
    status: "RECOMMENDED",
    upvotes: 620,
    teams_count: 4,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    tags: ["Coal Fires", "Air Quality", "IoT Sensors", "Mining Safety"],
    reported_by: "Dhanbad Environmental Action Cell",
    ai_domain: "IoT & Thermal Geospatial Mapping",
    ai_priority: "Critical",
    ai_severity: 10,
    ai_skills_required: ["Thermal Drone Imaging", "Sensor Mesh Networks", "Hazard Modeling"],
    funding_needed: "₹8,00,000",
  },
  {
    id: "jh-ch-03",
    title: "Decentralized Solar Cold Storage for Perishable Vegetables",
    description:
      "Smallholder farmers growing tomatoes and cauliflower in Tisri and Gawan blocks suffer 40% post-harvest rot during transit due to erratic grid power. A portable thermal battery cold room is needed.",
    district: "Giridih",
    gps_location: "24.1868° N, 86.3039° E",
    category: "Renewable Energy",
    status: "ACCEPTED",
    upvotes: 312,
    teams_count: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    tags: ["Solar Cold Room", "Post-Harvest", "Clean Energy", "Agri-Tech"],
    reported_by: "Giridih Kisan Utthan Producer Co.",
    ai_domain: "Renewable Energy & Thermal Storage",
    ai_priority: "High",
    ai_severity: 7,
    ai_skills_required: ["Phase Change Materials", "Solar PV Systems", "Embedded Microcontrollers"],
    funding_needed: "₹3,20,000",
  },
  {
    id: "jh-ch-04",
    title: "AI Elephant Corridor Detection to Prevent Human-Wildlife Conflict",
    description:
      "In the dense Saranda forest belt of West Singhbhum, wild elephant herds frequently cross into agrarian villages, leading to fatal encounters and crop loss. An optical/acoustic early-warning buzzer system is urgently requested.",
    district: "West Singhbhum",
    gps_location: "22.2575° N, 85.3400° E",
    category: "Forest & Environment",
    status: "IN_PROGRESS",
    upvotes: 541,
    teams_count: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toISOString(),
    tags: ["Wildlife Conservation", "Elephant Corridors", "Edge AI", "Acoustic Detection"],
    reported_by: "Saranda Van Suraksha Samiti",
    ai_domain: "Computer Vision & Edge AI",
    ai_priority: "Critical",
    ai_severity: 9,
    ai_skills_required: ["Edge AI Camera traps", "LoRaWAN Transceivers", "Audio Spectrogram ML"],
    funding_needed: "₹5,00,000",
  },
  {
    id: "jh-ch-05",
    title: "Maternal Anemia & Malnutrition Supply Tracking in Latehar & Gumla",
    description:
      "Over 65% of pregnant women in remote Latehar forest pockets suffer from severe anemia. Anganwadi iron supplements frequently experience delivery stockouts with no digitized distribution visibility.",
    district: "Latehar",
    gps_location: "23.7431° N, 84.4984° E",
    category: "Healthcare & Nutrition",
    status: "RECOMMENDED",
    upvotes: 389,
    teams_count: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    tags: ["Maternal Health", "Anemia", "Supply Chain", "Mobile Health"],
    reported_by: "Jharkhand Women & Child Health Collective",
    ai_domain: "Health Informatics & Predictive Logistics",
    ai_priority: "High",
    ai_severity: 8,
    ai_skills_required: ["Offline-first PWA", "SMS Gateway Integration", "Inventory Optimization"],
    funding_needed: "₹2,50,000",
  },
  {
    id: "jh-ch-06",
    title: "Solar-Powered Processing & Deseeding Machine for Mahua Flowers",
    description:
      "Tribal women collectors spend 6–8 hours manually drying and destoning forest Mahua and Chironji fruits, resulting in low sale margins to middlemen. A mechanized solar dryer and peeler would double producer income.",
    district: "Gumla",
    gps_location: "23.0427° N, 84.5422° E",
    category: "Agriculture & Soil",
    status: "ACCEPTED",
    upvotes: 275,
    teams_count: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    tags: ["Forest Produce", "Mahua Processing", "Women SHGs", "Appropriate Tech"],
    reported_by: "Mahila Vanopaj Mandali Gumla",
    ai_domain: "Mechanical Design & Rural Engineering",
    ai_priority: "Medium",
    ai_severity: 6,
    ai_skills_required: ["Low-Cost Mechanical Design", "Solar Thermal Drying", "Ergonomics"],
    funding_needed: "₹1,80,000",
  },
  {
    id: "jh-ch-07",
    title: "Solar-Powered Mesh Micro-Cloud for Remote Digital Classrooms",
    description:
      "More than 35 government secondary schools in forested Simdega have no cellular coverage. Students lack access to video lectures, interactive STEM labs, and NCERT digital simulations.",
    district: "Simdega",
    gps_location: "22.6158° N, 84.5097° E",
    category: "Education & Skills",
    status: "IN_PROGRESS",
    upvotes: 320,
    teams_count: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 22).toISOString(),
    tags: ["Digital Divide", "Raspberry Pi", "Offline E-Learning", "Rural Education"],
    reported_by: "Vidyalaya Sahayog Manch",
    ai_domain: "Decentralized Networks & EdTech",
    ai_priority: "High",
    ai_severity: 7,
    ai_skills_required: ["Linux Microservers", "Wi-Fi Hotspot Caching", "Interactive Web Apps"],
    funding_needed: "₹2,20,000",
  },
  {
    id: "jh-ch-08",
    title: "Industrial Acid Effluent Real-Time Sensor Alert on Subarnarekha River",
    description:
      "Unregulated discharge of industrial metal plating effluents into the Subarnarekha River kills aquatic life and affects downstream farming in Tupudana and Namkum. Real-time water probe monitoring is required.",
    district: "Ranchi",
    gps_location: "23.3441° N, 85.3096° E",
    category: "Water & Sanitation",
    status: "ANALYZING",
    upvotes: 492,
    teams_count: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    tags: ["River Pollution", "Effluent Monitoring", "Water Quality", "Industrial Waste"],
    reported_by: "Subarnarekha Bachao Samiti",
    ai_domain: "Environmental Sensing & Geo-Telemetry",
    ai_priority: "Critical",
    ai_severity: 9,
    ai_skills_required: ["Chemical Electro-sensors", "Water Quality Analytics", "LoRaWAN"],
    funding_needed: "₹3,90,000",
  },
  {
    id: "jh-ch-09",
    title: "Seasonal Riverbank Erosion Threatening Ganga-Basin Villages",
    description:
      "Monsoon surge currents along the Ganga river basin in Sahebganj and Rajmahal have washed away 180 acres of fertile silt land and displaced 300+ families. Bio-engineering vetiver grass protection needs testing.",
    district: "Sahebganj",
    gps_location: "25.2425° N, 87.6433° E",
    category: "Rural Infrastructure",
    status: "COMPLETED",
    upvotes: 215,
    teams_count: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString(),
    tags: ["Flood Mitigation", "Soil Erosion", "Bio-Engineering", "Ganga Basin"],
    reported_by: "Kisan Morcha Sahebganj",
    ai_domain: "Geotechnical Bio-Engineering",
    ai_priority: "High",
    ai_severity: 8,
    ai_skills_required: ["Geotechnical Surveying", "Bio-Geotextile Barriers", "Hydrology Simulation"],
    funding_needed: "₹6,00,000",
  },
];

const ALL_CATEGORIES: Category[] = [
  "Water & Sanitation",
  "Renewable Energy",
  "Agriculture & Soil",
  "Healthcare & Nutrition",
  "Education & Skills",
  "Forest & Environment",
  "Rural Infrastructure",
];

const JHARKHAND_DISTRICTS = [
  "All Districts",
  "Ranchi",
  "Dhanbad",
  "Khunti",
  "Giridih",
  "West Singhbhum",
  "Latehar",
  "Gumla",
  "Simdega",
  "Sahebganj",
  "East Singhbhum",
  "Bokaro",
  "Hazaribagh",
  "Deoghar",
  "Palamu",
];

export default function ExplorePage() {
  const [challenges, setChallenges] = useState<Challenge[]>(SAMPLE_CHALLENGES);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All Districts");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"upvotes" | "recent" | "severity">("upvotes");
  const [activeModalChallenge, setActiveModalChallenge] = useState<Challenge | null>(null);
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());

  // Attempt to load from Supabase if table has entries
  useEffect(() => {
    async function loadLiveChallenges() {
      try {
        const { data, error } = await supabase
          .from("challenges")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          // Merge database entries with rich attributes
          const mapped: Challenge[] = data.map((d: any, idx: number) => ({
            id: d.id || `live-${idx}`,
            title: d.title,
            description: d.description,
            district: d.district || "Ranchi",
            gps_location: d.gps_location || "23.3441° N, 85.3096° E",
            category: (d.category as Category) || "Rural Infrastructure",
            status: (d.status as Status) || "SUBMITTED",
            upvotes: d.upvotes || Math.floor(Math.random() * 200 + 40),
            teams_count: d.teams_count || 1,
            created_at: d.created_at || new Date().toISOString(),
            tags: d.tags || ["Societal Innovation", d.category || "General"],
            reported_by: "Registered Citizen",
            ai_domain: d.ai_domain || "Applied Technology",
            ai_priority: (d.ai_priority as any) || "High",
            ai_severity: d.ai_severity || 7,
            ai_skills_required: d.ai_skills_required || ["System Design", "Community Engagement"],
            funding_needed: "₹2,50,000",
          }));
          // Combine live with samples so the showcase is rich
          setChallenges([...mapped, ...SAMPLE_CHALLENGES]);
        }
      } catch (err) {
        // Fallback to sample challenges
      }
    }
    loadLiveChallenges();
  }, []);

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUpvotedIds((prev) => {
      const next = new Set(prev);
      const isUpvoted = next.has(id);
      if (isUpvoted) {
        next.delete(id);
      } else {
        next.add(id);
      }
      setChallenges((current) =>
        current.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              upvotes: item.upvotes + (isUpvoted ? -1 : 1),
            };
          }
          return item;
        })
      );
      return next;
    });
  };

  const filteredChallenges = useMemo(() => {
    let list = challenges;

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.district.toLowerCase().includes(q) ||
          c.ai_domain.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== "All") {
      list = list.filter((c) => c.category === selectedCategory);
    }

    if (selectedDistrict !== "All Districts") {
      list = list.filter((c) => c.district.toLowerCase() === selectedDistrict.toLowerCase());
    }

    if (selectedStatus !== "All") {
      list = list.filter((c) => c.status === selectedStatus);
    }

    return [...list].sort((a, b) => {
      if (sortBy === "upvotes") return b.upvotes - a.upvotes;
      if (sortBy === "severity") return b.ai_severity - a.ai_severity;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [challenges, search, selectedCategory, selectedDistrict, selectedStatus, sortBy]);

  const hasActiveFilters =
    search.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedDistrict !== "All Districts" ||
    selectedStatus !== "All";

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedDistrict("All Districts");
    setSelectedStatus("All");
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white p-8 md:p-12 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Jharkhand Societal Innovation Repository
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Explore Grassroots <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Challenges</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Real societal bottlenecks submitted by local citizens, SHGs, and field officers across Jharkhand's 24 districts. Adopt a challenge, collaborate as a university team, or provide industry funding.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/dashboard/citizen/report"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4" /> Report New Challenge
            </Link>
            <Link
              href="/dashboard/university"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-sm transition-all"
            >
              <GraduationCap className="w-4 h-4" /> University Portal
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
          <div>
            <div className="text-2xl md:text-3xl font-black text-emerald-400">1,240+</div>
            <div className="text-xs text-slate-400 font-medium">Challenges Logged</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-teal-300">24 Districts</div>
            <div className="text-xs text-slate-400 font-medium">Geographic Coverage</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-amber-300">84 Teams</div>
            <div className="text-xs text-slate-400 font-medium">Active Research Labs</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-blue-300">₹1.4 Cr+</div>
            <div className="text-xs text-slate-400 font-medium">CSR & Grant Pledged</div>
          </div>
        </div>
      </section>

      {/* Filter and Search Toolbar */}
      <section className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            id="explore-search"
            type="text"
            placeholder="Search problems by keyword (e.g. arsenic, solar, elephant, latehar, cold room)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition"
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

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === "All"
                ? "bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50"
            }`}
          >
            All Categories ({challenges.length})
          </button>
          {ALL_CATEGORIES.map((cat) => {
            const conf = CATEGORY_CONFIG[cat];
            const Icon = conf.icon;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(isSelected ? "All" : cat)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? conf.badgeBg + " shadow-sm ring-1 ring-emerald-500"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${conf.color}`} />
                {cat}
              </button>
            );
          })}
        </div>

        {/* Secondary Filters (District, Status, Sort) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* District Dropdown */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 shadow-sm text-xs font-medium text-slate-700 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <select
                id="district-filter"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                {JHARKHAND_DISTRICTS.map((d) => (
                  <option key={d} value={d} className="dark:bg-slate-900">
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Dropdown */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 shadow-sm text-xs font-medium text-slate-700 dark:text-slate-300">
              <Filter className="w-3.5 h-3.5 text-indigo-500" />
              <select
                id="status-filter"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="All" className="dark:bg-slate-900">All Statuses</option>
                <option value="SUBMITTED" className="dark:bg-slate-900">Submitted</option>
                <option value="ANALYZING" className="dark:bg-slate-900">AI Analyzing</option>
                <option value="RECOMMENDED" className="dark:bg-slate-900">Ready for Adoption</option>
                <option value="ACCEPTED" className="dark:bg-slate-900">Team Assigned</option>
                <option value="IN_PROGRESS" className="dark:bg-slate-900">In Progress</option>
                <option value="COMPLETED" className="dark:bg-slate-900">Resolved</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1"
              >
                <X className="w-3.5 h-3.5" /> Clear Filters
              </button>
            )}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span>Sort by:</span>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 font-semibold text-slate-800 dark:text-slate-200 focus:outline-none shadow-sm cursor-pointer"
            >
              <option value="upvotes">Most Upvoted 🔥</option>
              <option value="severity">Highest Severity ⚠️</option>
              <option value="recent">Newest First ⏱️</option>
            </select>
          </div>
        </div>
      </section>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-3">
        <span>
          Showing <strong className="text-slate-800 dark:text-slate-200">{filteredChallenges.length}</strong> challenge{filteredChallenges.length === 1 ? "" : "s"}
        </span>
        <span className="hidden sm:inline">Click any challenge card for AI deep dive & adoption options</span>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredChallenges.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8"
            >
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No challenges found</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                No challenges match your current search and filter criteria. Try resetting filters or searching with a broader keyword.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition"
              >
                Reset All Filters
              </button>
            </motion.div>
          ) : (
            filteredChallenges.map((challenge, idx) => {
              const catConf = CATEGORY_CONFIG[challenge.category] || CATEGORY_CONFIG["Rural Infrastructure"];
              const CategoryIcon = catConf.icon;
              const statusConf = STATUS_CONFIG[challenge.status] || STATUS_CONFIG.SUBMITTED;
              const isUpvoted = upvotedIds.has(challenge.id);

              return (
                <motion.div
                  key={challenge.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3) }}
                  onClick={() => setActiveModalChallenge(challenge)}
                  className="group relative flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-6 cursor-pointer overflow-hidden"
                >
                  {/* Priority Strip Top */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 ${
                      challenge.ai_priority === "Critical"
                        ? "bg-rose-500"
                        : challenge.ai_priority === "High"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                  />

                  <div>
                    {/* Top Row: Category & Status */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${catConf.badgeBg}`}>
                        <CategoryIcon className="w-3.5 h-3.5" />
                        {challenge.category}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${statusConf.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusConf.dotColor} animate-pulse`} />
                        {statusConf.label}
                      </span>
                    </div>

                    {/* District & Location */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{challenge.district}, Jharkhand</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 mb-2 leading-snug">
                      {challenge.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                      {challenge.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {challenge.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-400 font-medium"
                        >
                          <Tag className="w-2.5 h-2.5 opacity-60" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* AI Insights Snippet */}
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 mb-4 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="flex items-center gap-1 font-medium text-slate-500">
                          <Cpu className="w-3 h-3 text-purple-500" /> AI Domain:
                        </span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[140px]">
                          {challenge.ai_domain}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-slate-500">Severity Index:</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          {challenge.ai_severity}/10
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Meta & Actions */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    {/* Upvote Button */}
                    <button
                      type="button"
                      onClick={(e) => handleUpvote(challenge.id, e)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isUpvoted
                          ? "bg-amber-500 text-white shadow-md shadow-amber-500/20 scale-105"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-950/40"
                      }`}
                      title="Support this challenge"
                    >
                      <Flame className={`w-4 h-4 ${isUpvoted ? "fill-current" : "text-amber-500"}`} />
                      {challenge.upvotes}
                    </button>

                    {/* Team count & View Details */}
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                        <Users className="w-3.5 h-3.5 text-blue-500" />
                        {challenge.teams_count} {challenge.teams_count === 1 ? "team" : "teams"}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        Details <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Challenge Detail Modal */}
      <AnimatePresence>
        {activeModalChallenge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalChallenge(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="space-y-6">
                {/* Header tags */}
                <div className="flex flex-wrap items-center gap-2 pr-8">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${CATEGORY_CONFIG[activeModalChallenge.category]?.badgeBg}`}>
                    {activeModalChallenge.category}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${STATUS_CONFIG[activeModalChallenge.status]?.color}`}>
                    {STATUS_CONFIG[activeModalChallenge.status]?.label}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {activeModalChallenge.district} ({activeModalChallenge.gps_location})
                  </span>
                </div>

                {/* Modal Title */}
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 leading-snug">
                    {activeModalChallenge.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Reported by: <span className="text-slate-600 dark:text-slate-300 font-medium">{activeModalChallenge.reported_by}</span>
                  </p>
                </div>

                {/* Problem Statement */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Detailed Problem Statement</h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    {activeModalChallenge.description}
                  </p>
                </div>

                {/* AI Triage & Analysis Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-emerald-50/30 dark:from-indigo-950/20 dark:to-emerald-950/20 border border-indigo-100 dark:border-indigo-900/50 space-y-4">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                    <Cpu className="w-4 h-4" /> AI Triage & Recommendation Engine
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                      <span className="text-slate-400 block text-[11px]">Primary Domain</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{activeModalChallenge.ai_domain}</span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                      <span className="text-slate-400 block text-[11px]">Priority Level</span>
                      <span className={`font-bold mt-0.5 block ${activeModalChallenge.ai_priority === "Critical" ? "text-rose-600" : "text-amber-600"}`}>
                        {activeModalChallenge.ai_priority}
                      </span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                      <span className="text-slate-400 block text-[11px]">Estimated Grant</span>
                      <span className="font-bold text-emerald-600 mt-0.5 block">{activeModalChallenge.funding_needed}</span>
                    </div>
                  </div>

                  {/* Skills Required */}
                  <div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
                      Required Academic / Engineering Skills:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeModalChallenge.ai_skills_required.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-xs font-medium text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                  {activeModalChallenge.status === "IN_PROGRESS" || activeModalChallenge.status === "ACCEPTED" ? (
                    <Link
                      href="/projects"
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm text-center shadow-lg shadow-emerald-600/20 transition-all"
                    >
                      View Active Project & Student Team &rarr;
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard/university"
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm text-center shadow-lg shadow-emerald-600/20 transition-all"
                    >
                      Adopt as University Project
                    </Link>
                  )}
                  <Link
                    href="/dashboard/industry"
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-white font-bold text-sm text-center transition-all"
                  >
                    Pledge Industry / CSR Funding
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
