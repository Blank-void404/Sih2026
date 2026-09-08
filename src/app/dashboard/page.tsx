import type { Metadata } from 'next';
import { DashboardHubClient } from './dashboard-hub-client';

export const metadata: Metadata = {
  title: 'Stakeholder Dashboards Hub | JSIP',
  description: 'Select your role-specific dashboard to manage societal challenges, academic research projects, and corporate CSR sponsorships in Jharkhand.',
};

export default function DashboardLanding() {
  return <DashboardHubClient />;
}

