"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  role: string;
  full_name: string;
  email: string;
  organization_name?: string;
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (role: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback mock logic for MVP if Supabase fails or isn't set up properly yet
  const mockSignIn = async (role: string) => {
    const mockProfile: Profile = {
      id: `mock-user-${Date.now()}`,
      role: role,
      full_name: `Mock ${role}`,
      email: `${role.toLowerCase()}@example.com`,
      organization_name: role === 'UNIVERSITY' ? 'Jharkhand Tech University' : undefined,
    };
    setProfile(mockProfile);
    setUser({ id: mockProfile.id, email: mockProfile.email } as User);
    setIsLoading(false);
  };

  useEffect(() => {
    // Attempt real supabase auth
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user);
          // Fetch profile
          const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
          if (data) setProfile(data);
        }
      } catch (error) {
        console.warn("Real Supabase Auth failed, likely no project connected. Using mock auth mode.", error);
      } finally {
        setIsLoading(false);
      }

      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session) {
          setUser(session.user);
          const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
          if (data) setProfile(data);
        } else {
          setUser(null);
          setProfile(null);
        }
      });
      
      return () => {
        subscription.unsubscribe();
      };
    };

    initAuth();
  }, []);

  const signIn = async (role: string) => {
    // For MVP, we use mock sign in to easily switch roles
    // In production, this would be supabase.auth.signInWithOAuth or similar
    await mockSignIn(role);
  };

  const signOut = async () => {
    await supabase.auth.signOut().catch(() => {});
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
