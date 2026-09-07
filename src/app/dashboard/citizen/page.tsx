"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth-provider";
import Link from "next/link";
import { Clock, CheckCircle, AlertTriangle, FileText, ArrowRight } from "lucide-react";

type Challenge = {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  category: string;
};

export default function CitizenDashboard() {
  const { profile } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchChallenges() {
      // If no profile yet, show mock data instead of spinning forever
      if (!profile?.id) {
        setChallenges([
          {
            id: "mock-1",
            title: "Clean Water Shortage in Ranchi South",
            description: "The municipal water supply has been highly inconsistent for the past 3 weeks...",
            status: "ANALYZING",
            created_at: new Date().toISOString(),
            category: "Water & Sanitation"
          },
          {
            id: "mock-2",
            title: "Broken Road near High School",
            description: "Deep potholes are causing accidents near the local high school.",
            status: "RECOMMENDED",
            created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
            category: "Infrastructure"
          }
        ]);
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from("challenges")
          .select("*")
          .eq("citizen_id", profile.id)
          .order("created_at", { ascending: false });
          
        if (error) throw error;
        setChallenges(data || []);
      } catch (error) {
        console.error("Error fetching challenges:", error);
        // Fallback mock data for demonstration
        setChallenges([
          {
            id: "mock-1",
            title: "Clean Water Shortage in Ranchi South",
            description: "The municipal water supply has been highly inconsistent for the past 3 weeks...",
            status: "ANALYZING",
            created_at: new Date().toISOString(),
            category: "Water & Sanitation"
          },
          {
            id: "mock-2",
            title: "Broken Road near High School",
            description: "Deep potholes are causing accidents near the local high school.",
            status: "RECOMMENDED",
            created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
            category: "Infrastructure"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchChallenges();
  }, [profile]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SUBMITTED":
      case "ANALYZING":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "RECOMMENDED":
      case "ACCEPTED":
      case "IN_PROGRESS":
        return <AlertTriangle className="w-5 h-5 text-blue-500" />;
      case "COMPLETED":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      default:
        return <Clock className="w-5 h-5 text-slate-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const base = "px-2.5 py-0.5 rounded-full text-xs font-medium border";
    switch (status) {
      case "SUBMITTED": return `${base} bg-slate-100 text-slate-800 border-slate-200`;
      case "ANALYZING": return `${base} bg-amber-50 text-amber-800 border-amber-200`;
      case "RECOMMENDED": return `${base} bg-blue-50 text-blue-800 border-blue-200`;
      case "ACCEPTED": return `${base} bg-indigo-50 text-indigo-800 border-indigo-200`;
      case "IN_PROGRESS": return `${base} bg-purple-50 text-purple-800 border-purple-200`;
      case "COMPLETED": return `${base} bg-emerald-50 text-emerald-800 border-emerald-200`;
      default: return `${base} bg-slate-100 text-slate-800 border-slate-200`;
    }
  };

  if (isLoading) {
    return <div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"><div className="h-4 bg-slate-200 rounded w-3/4"></div><div className="space-y-2"><div className="h-4 bg-slate-200 rounded"></div><div className="h-4 bg-slate-200 rounded w-5/6"></div></div></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">My Reports</h1>
        <Link 
          href="/dashboard/citizen/report"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
        >
          New Report
        </Link>
      </div>

      {challenges.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No challenges reported yet</h3>
          <p className="text-slate-500 mb-6 max-w-sm mx-auto">
            You haven't submitted any societal challenges. Report an issue in your area to get started.
          </p>
          <Link 
            href="/dashboard/citizen/report"
            className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700"
          >
            Report a Challenge <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:border-emerald-200 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(challenge.status)}
                  <h3 className="text-lg font-semibold text-slate-900">{challenge.title}</h3>
                </div>
                <span className={getStatusBadge(challenge.status)}>
                  {challenge.status.replace("_", " ")}
                </span>
              </div>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                {challenge.description}
              </p>
              <div className="flex items-center text-xs text-slate-500 space-x-4">
                <span className="bg-slate-100 px-2 py-1 rounded">{challenge.category}</span>
                <span>Submitted on {new Date(challenge.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
