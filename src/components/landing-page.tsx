
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, BarChart, ArrowRight, Star } from "lucide-react";

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-primary/[.05] via-background to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline text-foreground">
                  Track Group Expenses, Effortlessly.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  From vacations to projects, FinFlow is the simplest way to manage spending. Stop wondering who paid for what and get a clear financial picture.
                </p>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Button asChild size="lg" className="group">
                    <Link href="/login">
                      Get Started for Free <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl shadow-2xl overflow-hidden group">
                 <Image
                    src="/placeholders/event-1.jpg"
                    width="600"
                    height="400"
                    alt="Hero image showing a travel scene"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint="travel planning vacation"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Everything You Need to Stay on Budget</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                FinFlow provides powerful, easy-to-use tools to keep your event finances organized and transparent.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-none">
              <div className="grid gap-2 text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Simple Expense Entry</h3>
                <p className="text-muted-foreground">Quickly add expenses with categories, amounts, and dates. No more messy spreadsheets.</p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Event-Based Tracking</h3>
                <p className="text-muted-foreground">Create separate events for vacations or projects to keep finances neatly organized.</p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                  <BarChart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Visual Analysis</h3>
                <p className="text-muted-foreground">Instantly see where your money is going with intuitive charts and spending breakdowns.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-16 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Get Started in 3 Easy Steps</h2>
            </div>
            <div className="relative grid gap-10 lg:grid-cols-3">
                <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 lg:hidden"></div>
                <div className="absolute top-0 left-1/2 w-px h-full bg-border -translate-x-1/2 lg:hidden"></div>
                <div className="hidden lg:block absolute top-8 left-0 w-full h-px bg-border"></div>

                <div className="flex flex-col items-center text-center gap-4 relative">
                    <div className="h-16 w-16 rounded-full bg-background border-2 border-primary text-primary flex items-center justify-center text-2xl font-bold font-headline">1</div>
                    <h3 className="text-xl font-bold mt-2">Create an Event</h3>
                    <p className="text-muted-foreground">Give your event a name, like "Summer Vacation" or "Apartment Reno".</p>
                </div>
                <div className="flex flex-col items-center text-center gap-4 relative">
                    <div className="h-16 w-16 rounded-full bg-background border-2 border-primary text-primary flex items-center justify-center text-2xl font-bold font-headline">2</div>
                    <h3 className="text-xl font-bold mt-2">Add Expenses</h3>
                    <p className="text-muted-foreground">Log your spending as it happens. Categorize each expense for clarity.</p>
                </div>
                <div className="flex flex-col items-center text-center gap-4 relative">
                    <div className="h-16 w-16 rounded-full bg-background border-2 border-primary text-primary flex items-center justify-center text-2xl font-bold font-headline">3</div>
                    <h3 className="text-xl font-bold mt-2">Analyze & Track</h3>
                    <p className="text-muted-foreground">Use the dashboard to see your total spending and breakdown by category.</p>
                </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-16 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Loved by Users Worldwide</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                        Don't just take our word for it. Here's what our users are saying.
                    </p>
                </div>
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="p-6 border rounded-lg bg-card shadow-sm">
                        <div className="flex items-center gap-1 mb-2">
                           {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                        </div>
                        <p className="text-card-foreground mb-4">"FinFlow completely simplified tracking costs for our annual friend's trip. No more confusion over who paid for what!"</p>
                        <div className="flex items-center gap-3">
                            <Image src="https://placehold.co/40x40.png" data-ai-hint="person avatar" alt="User Avatar" width={40} height={40} className="rounded-full" />
                            <div>
                                <p className="font-semibold">Sarah L.</p>
                                <p className="text-sm text-muted-foreground">Trip Organizer</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 border rounded-lg bg-card shadow-sm">
                        <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                        </div>
                        <p className="text-card-foreground mb-4">"As a freelance project manager, I use this to track expenses for small client projects. It's simple, intuitive, and looks great."</p>
                        <div className="flex items-center gap-3">
                            <Image src="https://placehold.co/40x40.png" data-ai-hint="person avatar" alt="User Avatar" width={40} height={40} className="rounded-full" />
                            <div>
                                <p className="font-semibold">Mike R.</p>
                                <p className="text-sm text-muted-foreground">Freelancer</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 border rounded-lg bg-card shadow-sm">
                        <div className="flex items-center gap-1 mb-2">
                           {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                        </div>
                        <p className="text-card-foreground mb-4">"We used it for our home renovation budget. The visual charts were incredibly helpful for seeing where our money was going."</p>
                        <div className="flex items-center gap-3">
                            <Image src="https://placehold.co/40x40.png" data-ai-hint="person avatar" alt="User Avatar" width={40} height={40} className="rounded-full" />
                            <div>
                                <p className="font-semibold">Jessica & Tom</p>
                                <p className="text-sm text-muted-foreground">Homeowners</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/* Call to Action Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-primary/5">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Ready to Take Control of Your Event Budget?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Sign up now and start tracking your expenses in minutes. It's free and easy to get started.
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
