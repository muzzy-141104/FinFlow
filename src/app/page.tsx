
"use client";

import { EventsDashboard } from '@/components/events-dashboard';
import LandingPage from '@/components/landing-page';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  return user ? <EventsDashboard /> : <LandingPage />;
}
