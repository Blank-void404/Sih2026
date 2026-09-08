"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, Users, ShieldCheck, MapPin } from "lucide-react";

export default function Home() {
  const stats = [
    { label: "Challenges Reported", value: "1,200+" },
    { label: "Active Projects", value: "350" },
    { label: "Universities Engaged", value: "24" },
    { label: "Industry Partners", value: "45" },
  ];

  return (
    <div className="space-y-24 pb-12">
      {/* Hero Section */}
      <section className="pt-20 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight">
            Innovate for a Better <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Jharkhand
            </span>
          </h1>
          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
            Connect societal challenges with university intelligence and industry resources to build impactful solutions for our state.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link
            href="/dashboard/citizen/report"
            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center group"
          >
            Report a Challenge
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/projects"
            className="w-full sm:w-auto px-8 py-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full font-semibold text-lg transition-all shadow-sm flex items-center justify-center"
          >
            Active Projects (5)
          </Link>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Challenges Reported", value: "1,200+", href: "/explore" },
            { label: "Active Projects", value: "5 Flagship", href: "/projects" },
            { label: "Universities Engaged", value: "24", href: "/dashboard/university" },
            { label: "Industry Partners", value: "45", href: "/dashboard/industry" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="text-center"
            >
              <Link href={stat.href} className="group block">
                <div className="text-4xl font-bold text-emerald-600 mb-2 group-hover:scale-105 transition-transform">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wide group-hover:text-emerald-700 transition-colors">{stat.label} &rarr;</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
          <p className="mt-4 text-slate-600">A collaborative ecosystem driving real change</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-100 via-emerald-300 to-teal-100 -translate-y-1/2 -z-10" />

          {[
            {
              icon: MapPin,
              title: "1. Citizens Report",
              desc: "Locals identify and submit societal issues in their districts using our easy-to-use portal.",
            },
            {
              icon: Lightbulb,
              title: "2. AI & Universities Analyze",
              desc: "AI categorizes the problem and matches it with the right university faculty and student teams.",
            },
            {
              icon: Users,
              title: "3. Industry & Gov Support",
              desc: "Industries provide funding and mentorship while government tracks progress and impact.",
            },
          ].map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center relative z-10"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
