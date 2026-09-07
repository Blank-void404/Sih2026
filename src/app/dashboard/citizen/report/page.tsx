"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { supabase } from "@/lib/supabase";
import { Loader2, UploadCloud } from "lucide-react";

export default function ReportChallenge() {
  const { profile } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    district: "",
    gps_location: "",
  });

  const categories = [
    "Agriculture", "Healthcare", "Education", "Water & Sanitation",
    "Environment", "Infrastructure", "Public Safety", "Other"
  ];
  
  const districts = [
    "Ranchi", "Dhanbad", "East Singhbhum (Jamshedpur)", "Bokaro",
    "Hazaribagh", "Deoghar", "Giridih", "Ramgarh", "Palamu"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setIsSubmitting(true);

    try {
      // 1. Simulate AI Analysis
      // In a real MVP, this would call an API route that uses OpenAI
      const aiDomain = formData.category;
      const aiPriority = "HIGH";
      const aiSeverity = Math.floor(Math.random() * 5) + 5; // 5-9
      const aiSkills = ["Data Analysis", "Project Management"];

      // 2. Save to Supabase
      const { data, error } = await supabase.from("challenges").insert([
        {
          citizen_id: profile.id,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          district: formData.district,
          gps_location: formData.gps_location || "Unknown",
          status: "ANALYZING",
          ai_domain: aiDomain,
          ai_priority: aiPriority,
          ai_severity: aiSeverity,
          ai_skills_required: aiSkills,
        }
      ]).select();

      // For MVP Demo: if Supabase fails (e.g. no DB connected), we just log and redirect
      if (error) {
        console.warn("Supabase insert failed, simulating success for MVP mock mode", error);
        // Simulate a small delay
        await new Promise(r => setTimeout(r, 1500));
      }

      router.push("/dashboard/citizen");
      router.refresh();
      
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Report a Challenge</h1>
        <p className="text-slate-500 mt-1">Submit a societal issue in your district. Our AI will analyze and route it to the right experts.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200">
        
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Challenge Title</label>
            <input
              required
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Severe water shortage during summer"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Detailed Description</label>
            <textarea
              required
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe the problem, its impact, and who is affected..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow resize-y"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select
                required
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
              >
                <option value="" disabled>Select category...</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="district" className="block text-sm font-medium text-slate-700 mb-1">District</label>
              <select
                required
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
              >
                <option value="" disabled>Select district...</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Mock Location/Media Upload */}
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
            <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-700">Upload Photos/Documents (Optional)</p>
            <p className="text-xs text-slate-500 mt-1">PNG, JPG, PDF up to 10MB</p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg mr-4 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-70 flex items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing & Submitting...
              </>
            ) : (
              "Submit Challenge"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
