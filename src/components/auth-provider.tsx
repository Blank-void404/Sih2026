"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export type UserRole = "CITIZEN" | "UNIVERSITY" | "INDUSTRY" | "GOVERNMENT_ADMIN";

export type Profile = {
  id: string;
  role: UserRole;
  full_name: string;
  email: string;
  organization_name?: string;
};

export interface DemoCredential {
  role: UserRole;
  roleLabel: string;
  email: string;
  password: string;
  defaultRedirect: string;
  organization?: string;
  fullName: string;
}

export const DEMO_CREDENTIALS: Record<string, DemoCredential> = {
  citizen: {
    role: "CITIZEN",
    roleLabel: "Citizen",
    email: "citizen@example.com",
    password: "Citizen@123",
    defaultRedirect: "/dashboard/citizen",
    organization: "Ranchi Citizens Action Forum",
    fullName: "Ramesh Mahto",
  },
  university: {
    role: "UNIVERSITY",
    roleLabel: "University / Academic",
    email: "university@example.com",
    password: "University@123",
    defaultRedirect: "/dashboard/university",
    organization: "Birsa Institute of Technology (BIT) Mesra",
    fullName: "Dr. Anjali Mehta",
  },
  industry: {
    role: "INDUSTRY",
    roleLabel: "Industry Partner",
    email: "industry@example.com",
    password: "Industry@123",
    defaultRedirect: "/dashboard/industry",
    organization: "Tata Steel CSR Foundation",
    fullName: "Dr. Vivek Chhabra",
  },
  admin: {
    role: "GOVERNMENT_ADMIN",
    roleLabel: "Government / Admin",
    email: "admin@example.com",
    password: "Admin@123",
    defaultRedirect: "/dashboard/admin",
    organization: "Dept. of Higher & Technical Education, Govt. of Jharkhand",
    fullName: "Sri Alok Kumar (IAS)",
  },
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (role: UserRole | string) => Promise<void>;
  signInWithCredentials: (email: string, password: string) => Promise<{ success: boolean; error?: string; role?: UserRole; redirectUrl?: string }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isLoading: true,
  signIn: async () => {},
  signInWithCredentials: async () => ({ success: false }),
  signOut: async () => {},
});

const AUTH_STORAGE_KEY = "jsip_auth_profile_v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth from session or local storage demo profile
  useEffect(() => {
    const initAuth = async () => {
      try {
        // First check localStorage demo profile
        const cached = localStorage.getItem(AUTH_STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached) as Profile;
          setProfile(parsed);
          setUser({ id: parsed.id, email: parsed.email } as User);
          setIsLoading(false);
          return;
        }

        // Check Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user);
          const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
          if (data) {
            setProfile(data);
          }
        }
      } catch (error) {
        console.warn("Auth initialization note:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const saveProfileSession = (prof: Profile | null) => {
    setProfile(prof);
    if (prof) {
      setUser({ id: prof.id, email: prof.email } as User);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(prof));
    } else {
      setUser(null);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const signIn = async (role: UserRole | string) => {
    // Find matching demo profile or build fallback
    const key = Object.keys(DEMO_CREDENTIALS).find(
      (k) => DEMO_CREDENTIALS[k].role === role
    ) || "citizen";
    const demo = DEMO_CREDENTIALS[key];

    const newProfile: Profile = {
      id: `usr-${demo.role.toLowerCase()}-${Date.now().toString().slice(-4)}`,
      role: demo.role,
      full_name: demo.fullName,
      email: demo.email,
      organization_name: demo.organization,
    };

    saveProfileSession(newProfile);
  };

  const signInWithCredentials = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string; role?: UserRole; redirectUrl?: string }> => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPass = password.trim();

    // Check credentials against demo users
    const matchedKey = Object.keys(DEMO_CREDENTIALS).find(
      (k) => DEMO_CREDENTIALS[k].email.toLowerCase() === normalizedEmail
    );

    if (matchedKey) {
      const demo = DEMO_CREDENTIALS[matchedKey];
      if (demo.password !== normalizedPass) {
        return { success: false, error: "Incorrect password. For demo, use: " + demo.password };
      }

      const prof: Profile = {
        id: `usr-${demo.role.toLowerCase()}-active`,
        role: demo.role,
        full_name: demo.fullName,
        email: demo.email,
        organization_name: demo.organization,
      };

      saveProfileSession(prof);
      return {
        success: true,
        role: demo.role,
        redirectUrl: demo.defaultRedirect,
      };
    }

    // Try Supabase auth if not a predefined demo credential
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: normalizedPass,
      });

      if (error) {
        return {
          success: false,
          error: "Invalid credentials. Please use one of the demo accounts provided.",
        };
      }

      if (data.user) {
        const { data: profData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

        const role = (profData?.role as UserRole) || "CITIZEN";
        const redirectUrl =
          role === "UNIVERSITY"
            ? "/dashboard/university"
            : role === "INDUSTRY"
            ? "/dashboard/industry"
            : role === "GOVERNMENT_ADMIN"
            ? "/dashboard/admin"
            : "/dashboard/citizen";

        const p: Profile = {
          id: data.user.id,
          role,
          full_name: profData?.full_name || "User",
          email: data.user.email || normalizedEmail,
          organization_name: profData?.organization_name,
        };

        saveProfileSession(p);
        return { success: true, role, redirectUrl };
      }
    } catch (e: any) {
      return {
        success: false,
        error: "Login failed: " + (e.message || "Unknown error"),
      };
    }

    return {
      success: false,
      error: "Account not found. Please click any demo login button below.",
    };
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    saveProfileSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        signIn,
        signInWithCredentials,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
