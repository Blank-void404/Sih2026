import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Select a dashboard to manage challenges',
};

export default function DashboardLanding() {
  const dashboards = [
    { name: 'Citizen', href: '/dashboard/citizen', description: 'Report and view citizen challenges', icon: '👥' },
    { name: 'University', href: '/dashboard/university', description: 'Academic collaborations and research', icon: '🎓' },
    { name: 'Industry', href: '/dashboard/industry', description: 'Industry partners and solutions', icon: '🏭' },
  ];

  return (
    <section className="py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-gray-100">Select a Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {dashboards.map((d) => (
          <a
            key={d.name}
            href={d.href}
            className="group block p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700 hover:border-emerald-500"
          >
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-3">{d.icon}</span>
              <h2 className="text-xl font-semibold text-slate-700 dark:text-gray-200 group-hover:text-emerald-600 transition-colors">{d.name} Dashboard</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-gray-400">{d.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
