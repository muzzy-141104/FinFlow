
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, BarChart } from "lucide-react";

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline">
                  Track Your Event Expenses, Effortlessly.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  FinFlow is the simplest way to manage spending for group trips, projects, and events. Stop wondering who paid for what and get a clear picture of your finances.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/login">Get Started for Free</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="/placeholders/hero.jpg"
                width="600"
                height="400"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                data-ai-hint="financial planning app screenshot"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Everything You Need to Stay on Budget</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  FinFlow provides powerful, easy-to-use tools to keep your event finances organized and transparent.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1 text-center p-6 rounded-lg hover:bg-muted/50 transition-colors">
                <CheckCircle className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Simple Expense Entry</h3>
                <p className="text-sm text-muted-foreground">Quickly add expenses with categories, amounts, and dates. No more messy spreadsheets.</p>
              </div>
              <div className="grid gap-1 text-center p-6 rounded-lg hover:bg-muted/50 transition-colors">
                <Users className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Event-Based Tracking</h3>
                <p className="text-sm text-muted-foreground">Create separate events for vacations, work projects, or parties to keep finances neatly organized.</p>
              </div>
              <div className="grid gap-1 text-center p-6 rounded-lg hover:bg-muted/50 transition-colors">
                <BarChart className="h-8 w-8 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Visual Analysis</h3>
                <p className="text-sm text-muted-foreground">Instantly see where your money is going with intuitive charts and spending breakdowns.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Ready to Take Control of Your Event Budget?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up now and start tracking your expenses in minutes. It's free to get started.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
                <Button asChild size="lg">
                    <Link href="/login">Sign Up Now</Link>
                </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} FinFlow. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
