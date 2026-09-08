"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowRight, Lightbulb, Users, ShieldCheck, MapPin, 
  Sparkles, CheckCircle2, TrendingUp, AlertTriangle, 
  Building2, GraduationCap, ChevronRight, Filter, Award, 
  FileText, ExternalLink, Activity, ArrowUpRight, Zap
} from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-16 pb-16 text-slate-800">
      
      {/* 1. HERO SECTION */}
      <section className="relative rounded-3xl overflow-hidden bg-[#0A1224] text-white p-6 sm:p-10 lg:p-14 border border-slate-800 shadow-2xl">
        {/* Subtle Background Pattern & Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1E38] via-[#0A1224] to-[#121B2D] opacity-90 -z-10" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#D9531E]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl space-y-6">
          {/* State Tag Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9531E]/15 border border-[#D9531E]/40 text-[#FF7A45] text-xs font-bold uppercase tracking-wider"
          >
            <span className="w-2 h-2 rounded-full bg-[#D9531E] animate-pulse"></span>
            JHARKHAND INNOVATION FRAMEWORK • State & National Network
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white font-serif">
              Solve Real Problems. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A45] via-[#E55B2B] to-[#F59E0B]">
                Build a Better India.
              </span>
            </h1>
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed pt-2">
              Connecting citizens, universities, industry, and government to transform societal challenges into field-tested solutions.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
          >
            <Link
              href="/dashboard/citizen/report"
              className="px-8 py-4 bg-[#D9531E] hover:bg-[#B83E12] text-white rounded-2xl font-extrabold text-base transition-all shadow-lg shadow-[#D9531E]/30 flex items-center justify-center gap-2 group"
            >
              Submit a Challenge
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/explore"
              className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-2xl font-bold text-base transition-all backdrop-blur-md flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              Explore Challenges
            </Link>
          </motion.div>
        </div>

        {/* Live Ticker & Quick Filter Pill Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs"
        >
          <div className="flex items-center gap-2 text-slate-400">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-slate-200">JHARKHAND LIVE REGISTRY FEED</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              12 New Updates
            </span>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link 
              href="/explore?filter=districts"
              className="px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-semibold transition"
            >
              📍 Districts +
            </Link>
            <Link 
              href="/explore?filter=challenges"
              className="px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-semibold transition"
            >
              🔥 Challenges +
            </Link>
            <Link 
              href="/explore?filter=university"
              className="px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-semibold transition"
            >
              🎓 University +
            </Link>
          </div>
        </motion.div>
      </section>


      {/* 2. NATIONAL & STATE TELEMETRY (STATS GRID) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D9531E]">
              <Activity className="w-4 h-4" />
              National & State Telemetry
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif mt-1">
              Real-time aggregate delivery across Jharkhand and nation
            </h2>
          </div>
          <Link
            href="/dashboard/admin"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#E5E0D4] text-xs font-bold text-slate-700 hover:text-[#D9531E] hover:border-[#D9531E] shadow-sm transition"
          >
            ⚡ Live Telemetry
          </Link>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {
              title: "Challenges Submitted",
              value: "5,420+",
              sub: "↗ +120 this month",
              color: "text-slate-900",
              badge: "text-emerald-700 bg-emerald-50",
              href: "/explore",
            },
            {
              title: "Solutions Deployed",
              value: "730+",
              sub: "↗ Active in field",
              color: "text-slate-900",
              badge: "text-emerald-700 bg-emerald-50",
              href: "/projects",
            },
            {
              title: "Partner Universities",
              value: "65",
              sub: "↗ 24 in Jharkhand",
              color: "text-slate-900",
              badge: "text-blue-700 bg-blue-50",
              href: "/dashboard/university",
            },
            {
              title: "Industry Partners",
              value: "120+",
              sub: "↗ Tata, Steel, Coal",
              color: "text-slate-900",
              badge: "text-purple-700 bg-purple-50",
              href: "/dashboard/industry",
            },
            {
              title: "Districts Covered",
              value: "24",
              sub: "↗ 100% JH coverage",
              color: "text-slate-900",
              badge: "text-amber-700 bg-amber-50",
              href: "/explore",
            },
            {
              title: "CITIZENS IMPACTED",
              value: "1.2M+",
              sub: "↗ Tested & validated",
              color: "text-amber-400",
              bg: "bg-[#0B132B] text-white border-slate-800",
              badge: "text-amber-400 bg-amber-950/80 border border-amber-800/60",
              href: "/dashboard/admin",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Link
                href={item.href}
                className={`block p-4 sm:p-5 rounded-2xl border transition-all hover:scale-[1.02] shadow-sm ${
                  item.bg || "bg-white border-[#E6E1D7] hover:border-[#D9531E]"
                }`}
              >
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate mb-1">
                  {item.title}
                </div>
                <div className={`text-2xl sm:text-3xl font-black ${item.color} tracking-tight`}>
                  {item.value}
                </div>
                <div className={`mt-2 inline-block text-[10px] font-bold px-2 py-0.5 rounded ${item.badge}`}>
                  {item.sub}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>


      {/* 3. HERITAGE & INNOVATION INITIATIVE SHOWCASE */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E1D7] shadow-md space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D9531E]">
            <Award className="w-4 h-4" />
            Heritage & Innovation Initiative
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
            State Sponsored
          </span>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Art Feature Image */}
          <div className="md:col-span-6 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 group aspect-[16/9]">
            <Image
              src="/images/sohrai-art.jpg"
              alt="Jharkhand Sohrai and Khovar Tribal Art"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-black/60 px-2 py-0.5 rounded w-max mb-1 backdrop-blur-sm">
                MOUNTED CULTURAL ART TECH
              </span>
              <h4 className="text-lg font-bold font-serif leading-tight">
                Jharkhand Grassroots Innovation & Heritage Initiative
              </h4>
            </div>
          </div>

          {/* Details Content */}
          <div className="md:col-span-6 space-y-4">
            <h3 className="text-2xl font-extrabold text-slate-900 font-serif leading-snug">
              Preserving Indigenous Sohrai & Khovar Art Traditions
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Preserving indigenous Sohrai and Khovar mural traditions through digital documentation tagging, smart fiber market linkages, and eco-pigment synthesis developed in collaboration with Jharkhand state universities.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold">
              <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                1,400+ Tribal Artisans Supported
              </span>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1 text-[#D9531E] hover:underline"
              >
                Learn More <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* 4. EXPLORE SOCIETAL CHALLENGES (HIGH PRIORITY LIST) */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D9531E]">
              <AlertTriangle className="w-4 h-4" />
              Explore Societal Challenges
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif mt-1">
              High priority civic problems awaiting engineering solutions
            </h2>
          </div>
          <Link
            href="/explore"
            className="text-xs font-bold text-[#D9531E] hover:underline flex items-center gap-1"
          >
            View All →
          </Link>
        </div>

        {/* 3 Challenge Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              id: "ID: JH-2026-WTR-018",
              priority: "High Priority",
              priorityBadge: "bg-rose-100 text-rose-800 border-rose-200",
              dot: "bg-rose-500",
              title: "Fluoride-Free Drinking Water Remediation in Ranchi District",
              district: "Ranchi, Jharkhand",
              domain: "Water & Sanitation",
              impact: "2,500 Families Affected",
              href: "/explore",
            },
            {
              id: "ID: JH-2026-ELEC-042",
              priority: "In Progress",
              priorityBadge: "bg-amber-100 text-amber-800 border-amber-200",
              dot: "bg-amber-500",
              title: "Smart Irrigation & Grid Storage Telemetry for Hazaribagh",
              district: "Hazaribagh, Jharkhand",
              domain: "Agritech & AI",
              impact: "1,100 Smallholder Farmers",
              href: "/explore",
            },
            {
              id: "ID: JH-2026-FST-009",
              priority: "Under Review",
              priorityBadge: "bg-emerald-100 text-emerald-800 border-emerald-200",
              dot: "bg-emerald-500",
              title: "Forest & Tribal Minor Produce Processing Units",
              district: "East Singhbhum, JH",
              domain: "Tribal Enterprise",
              impact: "14 Remote Self-Help Groups",
              href: "/explore",
            },
          ].map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-[#E6E1D7] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-500 font-semibold">{card.id}</span>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${card.priorityBadge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${card.dot}`}></span>
                    {card.priority}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-serif leading-snug hover:text-[#D9531E] transition-colors cursor-pointer">
                  {card.title}
                </h3>

                <div className="grid grid-cols-2 gap-2 text-xs bg-[#FAF7F2] p-3 rounded-xl border border-[#E5E0D4]">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">District & State</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D9531E]" />
                      {card.district}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-semibold">Technical Domain</span>
                    <span className="font-bold text-slate-800">{card.domain}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-600 font-medium">
                  <span className="font-bold text-slate-900">{card.impact}</span>
                </div>
                <Link
                  href={card.href}
                  className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#D9531E] hover:text-white border border-[#E5E0D4] text-slate-900 text-xs font-bold rounded-xl transition-all"
                >
                  Submit Solution
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* 5. HOW THE PLATFORM WORKS (4-STEP PATHWAY) */}
      <section className="bg-white rounded-3xl p-8 border border-[#E6E1D7] shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#D9531E]">
            📍 How We Work
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-serif tracking-tight">
            How the Platform Works
          </h2>
          <p className="text-sm text-slate-600">
            A step-verified pathway from grassroots problem to national impact.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {[
            {
              step: "01",
              title: "Citizen Verification",
              desc: "Local residents and panchayats submit field-verified problems with photos, location tags, and urgency parameters.",
              icon: MapPin,
            },
            {
              step: "02",
              title: "Academic R&D Matching",
              desc: "State institutions like BIT Mesra, IIT ISM Dhanbad pick up verified challenges as structured project research topics.",
              icon: GraduationCap,
            },
            {
              step: "03",
              title: "Industry Scale-up & CSR",
              desc: "Industrial partners (Tata Steel, Coal India) provide seed grants and specialized testing facilities for scalable prototypes.",
              icon: Building2,
            },
            {
              step: "04",
              title: "Government Procurement",
              desc: "District administrations transition successful prototypes directly under State Innovation Directives.",
              icon: ShieldCheck,
            },
          ].map((item, idx) => (
            <div
              key={item.step}
              className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E5E0D4] space-y-3 relative group hover:border-[#D9531E] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-[#D9531E] font-mono">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E0D4] flex items-center justify-center text-[#D9531E] shadow-sm">
                  <item.icon className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 font-serif pt-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* 6. ANCHOR PROJECTS SHOWCASE (VERIFIED SOLUTIONS) */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D9531E]">
              <Award className="w-4 h-4" />
              Anchor Projects Showcase
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif mt-1">
              Deployed solutions backed by leading institutions
            </h2>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E5E0D4] text-xs font-bold text-slate-700">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              status: "DEPLOYED IN FIELD",
              statusBadge: "bg-emerald-100 text-emerald-800 border-emerald-200",
              location: "Ranchi & Khunti",
              title: "Low-Cost Groundwater Arsenic & Fluoride Filter",
              subtitle: "Built and tested by BIT Mesra Engineering Team for village-scale distribution.",
              metric1: "80 l/min",
              metric2: "Total Grant ₹20 Lakhs",
              metric3: "42 Villages Covered",
              href: "/projects",
            },
            {
              status: "FIELD TRIAL IN PROGRESS",
              statusBadge: "bg-amber-100 text-amber-800 border-amber-200",
              location: "Dhanbad & Bokaro",
              title: "Coal Belt Particulate Air Quality Scrubbing Complex",
              subtitle: "Automated low-energy ion scrubber for open-cast mine perimeter air quality improvement.",
              metric1: "47 Air Monitoring Stations",
              metric2: "View Metric",
              metric3: "6 Mine Sites",
              href: "/projects",
            },
          ].map((proj, idx) => (
            <div
              key={proj.title}
              className="bg-white rounded-2xl p-6 border border-[#E6E1D7] shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-extrabold ${proj.statusBadge}`}>
                    {proj.status}
                  </span>
                  <span className="text-slate-500 font-semibold">{proj.location}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-serif leading-tight">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {proj.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs gap-2">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <span className="px-2.5 py-1 bg-[#FAF7F2] rounded-lg border border-[#E5E0D4]">
                    {proj.metric1}
                  </span>
                  <span className="px-2.5 py-1 bg-[#FAF7F2] rounded-lg border border-[#E5E0D4]">
                    {proj.metric2}
                  </span>
                </div>

                <span className="text-[#D9531E] font-bold text-xs">
                  {proj.metric3}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 7. GEOGRAPHICAL REGISTRY (DISTRICT IMPACT TELEMETRY) */}
      <section className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D9531E]">
            📍 Geographical Registry
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif mt-1">
            Jharkhand District Impact Telemetry
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Active innovation metrics across priority administrative zones.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { district: "Ranchi", count: "142", dot: "bg-emerald-500" },
            { district: "Dhanbad", count: "98", dot: "bg-amber-500" },
            { district: "Jamshedpur", count: "116", dot: "bg-emerald-500" },
            { district: "Hazaribagh", count: "64", dot: "bg-amber-500" },
            { district: "Dumka", count: "52", dot: "bg-rose-500" },
            { district: "Bokaro", count: "79", dot: "bg-emerald-500" },
          ].map((item) => (
            <div
              key={item.district}
              className="bg-white p-4 rounded-2xl border border-[#E6E1D7] space-y-1 shadow-sm hover:border-[#D9531E] transition-all"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>{item.district}</span>
                <span className={`w-2 h-2 rounded-full ${item.dot}`}></span>
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {item.count}
              </div>
              <div className="text-[10px] font-semibold text-slate-500">
                Active Solutions
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 8. CALL TO ACTION BANNER */}
      <section className="bg-[#0B132B] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#D9531E]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800/80">
            JOIN THE MISSION
          </span>

          <h2 className="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-tight">
            Ready to Solve India's Toughest Societal Challenges?
          </h2>

          <p className="text-base text-slate-300 leading-relaxed font-normal">
            Whether you are a grassroots citizen, student engineer, university professor, or industrial executive, your contribution shapes the nation.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              href="/dashboard/citizen/report"
              className="px-8 py-4 bg-[#D9531E] hover:bg-[#B83E12] text-white rounded-2xl font-extrabold text-base transition-all shadow-lg shadow-[#D9531E]/30 flex items-center justify-center gap-2 group"
            >
              Register as Innovator ↗
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2"
            >
              Download Annual Report ↗
            </Link>
          </div>
        </div>
      </section>


      {/* 9. DATA SOVEREIGNTY & TRANSPARENCY GUARANTEE (FOOTER) */}
      <footer className="pt-8 border-t border-[#E6E1D7] text-xs text-slate-600 space-y-6">
        <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E5E0D4] space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <ShieldCheck className="w-4 h-4 text-[#D9531E]" />
            Data Sovereignty & Transparency Guarantee
          </div>
          <p className="leading-relaxed text-slate-600">
            All submissions, data logs, and solution validations are maintained in verifiable state ledger formats compiled under the National Cyber State Policy (NIC-DST). Managed and operated under governance directives of the Office of the Principal Advisor for Science, Technology & Innovation, Government of Jharkhand.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-semibold text-slate-500">
            <span className="bg-white px-2.5 py-1 rounded border border-[#E5E0D4]">
              NIC Portal Compliant
            </span>
            <span className="bg-white px-2.5 py-1 rounded border border-[#E5E0D4]">
              Version 2.8.0-b4
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 National Innovation Portal • Jharkhand Innovation Network
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/privacy" className="hover:underline">Terms of Use</Link>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/privacy" className="hover:underline">Open Data Policy</Link>
            <span className="text-[#D9531E] font-bold">Toll Free: 1800 11 0020</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
