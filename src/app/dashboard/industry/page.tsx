import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industry Dashboard',
  description: 'Industry partners can view and accept challenges relevant to their sector',
};

export default function IndustryDashboard() {
  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-slate-800 dark:text-gray-100">Industry Dashboard</h1>
      <p className="text-slate-600 dark:text-gray-400 mb-6">
        This is a placeholder for the industry dashboard. Future features will include challenge listings, partnership tools, and project tracking.
      </p>
      <a href="/dashboard" className="text-emerald-600 hover:underline">← Back to Dashboard Selection</a>
    </section>
  );
}
