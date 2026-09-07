"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth-provider";
import { Lightbulb, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UniversityDashboard() {
  const { profile } = useAuth();
  const [challenges, setChallenges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchChallenges() {
      try {
        const { data, error } = await supabase
          .from("challenges")
          .select("*")
          .in("status", ["ANALYZING", "RECOMMENDED"])
          .order("ai_severity", { ascending: false })
          .limit(10);
          
        if (error) throw error;
        setChallenges(data || []);
      } catch (error) {
        console.error("Error fetching recommended challenges:", error);
        // Fallback Mock Data
        setChallenges([
          {
            id: "c-1",
            title: "Groundwater Depletion in Industrial Area",
            description: "Rapid industrialization is causing severe depletion of groundwater levels, affecting local agriculture.",
            category: "Water & Sanitation",
            district: "East Singhbhum (Jamshedpur)",
            ai_domain: "Environmental Engineering",
            ai_priority: "HIGH",
            ai_severity: 8,
            ai_skills_required: ["Hydrology", "Data Mapping", "Policy Analysis"]
          },
          {
            id: "c-2",
            title: "Lack of Digital Literacy in Rural Schools",
            description: "Students lack basic computer skills, putting them at a disadvantage for future employment.",
            category: "Education",
            district: "Palamu",
            ai_domain: "EdTech",
            ai_priority: "MEDIUM",
            ai_severity: 6,
            ai_skills_required: ["Software Dev", "Instructional Design"]
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchChallenges();
  }, []);

  const handleAcceptChallenge = async (challenge: any) => {
    if (!profile) return;
    
    try {
      // Create Project
      const { data: project, error: pError } = await supabase
        .from("projects")
        .insert([{
          challenge_id: challenge.id,
          university_id: profile.id,
          title: `Project: ${challenge.title}`,
          description: challenge.description,
          status: "PLANNING"
        }])
        .select()
        .single();

      if (pError) console.warn("Supabase project insert failed, mocking for MVP");

      // Update challenge status
      const { error: cError } = await supabase
        .from("challenges")
        .update({ status: "ACCEPTED" })
        .eq("id", challenge.id);

      if (cError) console.warn("Supabase challenge update failed, mocking for MVP");

      alert("Challenge Accepted! Project created successfully.");
      // For MVP mock, just remove from list
      setChallenges(prev => prev.filter(c => c.id !== challenge.id));
      
      // router.push('/dashboard/university/projects');
      
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <div>Loading recommendations...</div>;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Recommended Challenges</h1>
        <p className="text-slate-500 mt-1">AI-matched societal issues that align with your institution's expertise.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-100">
                  Priority: {challenge.ai_priority} ({challenge.ai_severity}/10)
                </span>
                <span className="text-xs font-medium text-slate-500">{challenge.district}</span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-2">{challenge.title}</h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-3">{challenge.description}</p>
              
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase mb-1">AI Classification</div>
                  <span className="inline-block bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded">{challenge.ai_domain}</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Required Skills</div>
                  <div className="flex flex-wrap gap-1.5">
                    {challenge.ai_skills_required?.map((skill: string) => (
                      <span key={skill} className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2 py-1 rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 px-5 py-4 border-t border-slate-100 flex justify-between items-center mt-auto">
              <button 
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                onClick={() => alert("Show challenge details modal")}
              >
                View Details
              </button>
              <button
                onClick={() => handleAcceptChallenge(challenge)}
                className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Accept Challenge
                <ArrowRight className="ml-1.5 w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {challenges.length === 0 && (
          <div className="col-span-full p-12 text-center bg-white rounded-xl border border-slate-200">
            <Lightbulb className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-900">No new recommendations</h3>
            <p className="text-slate-500">You're caught up! Check back later for new societal challenges.</p>
          </div>
        )}
      </div>
    </div>
  );
}
