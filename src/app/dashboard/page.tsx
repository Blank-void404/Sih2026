import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboards Hub | JSIP',
  description: 'Select your role-specific dashboard to manage societal challenges, projects, and sponsorships',
};

export default function DashboardLanding() {
  const dashboards = [
    {
      name: 'Citizen',
      href: '/dashboard/citizen',
      description: 'Report local civic/infrastructure challenges and track resolution progress.',
      icon: '👥',
      badge: 'Public & SHGs',
      color: 'hover:border-emerald-500',
    },
    {
      name: 'University',
      href: '/dashboard/university',
      description: 'Academic research labs, challenge adoptions, student cohorts, and faculty mentors.',
      icon: '🎓',
      badge: 'Higher Ed & Technical',
      color: 'hover:border-blue-500',
    },
    {
      name: 'Industry',
      href: '/dashboard/industry',
      description: 'Corporate CSR sponsors, technical mentoring, grant commitments, and field testing.',
      icon: '🏭',
      badge: 'Corporate & CSR',
      color: 'hover:border-purple-500',
    },
    {
      name: 'Government Admin',
      href: '/dashboard/admin',
      description: 'Statewide governance oversight across Jharkhand’s 24 districts, audit & impact analytics.',
      icon: '🏛️',
      badge: 'Govt. of Jharkhand',
      color: 'hover:border-amber-500',
    },
    {
      name: 'Active Projects Showcase',
      href: '/projects',
      description: 'Explore all 5 flagship engineering prototypes with student teams, mentors, and milestones.',
      icon: '🚀',
      badge: 'State Innovation',
      color: 'hover:border-teal-500',
    },
  ];

  return (
    <section className="py-12 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Role-Based Access
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
          Select Your Portal
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Sign in or jump directly into any stakeholder workspace in the Jharkhand Societal Innovation ecosystem.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {dashboards.map((d) => (
          <Link
            key={d.name}
            href={d.href}
            className={`group flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800 ${d.color}`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{d.icon}</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {d.badge}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {d.name} {d.name.includes('Showcase') ? '' : 'Dashboard'}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {d.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Enter Workspace</span>
              <span>&rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
