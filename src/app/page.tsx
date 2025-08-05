
"use client";

import { EventsDashboard } from '@/components/events-dashboard';
import LandingPage from '@/components/landing-page';
import { useAuth } from '@/hooks/use-auth';
import { LoadingSpinner } from '@/components/loading-spinner';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  return user ? <EventsDashboard /> : <LandingPage />;
}
