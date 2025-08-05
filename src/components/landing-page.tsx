
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Wallet, PieChart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-primary/5 dark:via-background dark:to-background" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl lg:text-7xl font-headline tracking-tight">
                  <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Effortless
                  </span>{" "}
                  <span className="text-foreground">Expense Tracking for Any Event.</span>
                </h1>
                
                <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl leading-relaxed">
                  From vacations to projects, FinFlow helps you manage expenses with ease. Create events, track spending, and see where your money goes with beautiful visualizations.
                </p>
                
                <div className="flex flex-col gap-4 sm:flex-row">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button asChild size="lg" className="group bg-primary shadow-lg text-lg px-8 py-6 rounded-full">
                      <Link href="/login">
                        Get Started Free
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative w-full h-[20rem] md:h-[24rem] lg:h-[28rem] group"
              >
                <div className="w-full h-full rounded-2xl shadow-2xl overflow-hidden">
                  <Image
                    src="/placeholders/event-1.jpg"
                    width={800}
                    height={600}
                    alt="Dashboard preview for expense tracking"
                    className="w-full h-full object-cover"
                    data-ai-hint="planning travel budget"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-28 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl tracking-tight font-headline">
                Everything You Need to Stay on Budget
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg">
                FinFlow provides powerful, easy-to-use tools to give you a clear view of your finances.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Wallet className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-headline">Create & Manage Events</h3>
                <p className="text-muted-foreground">Organize your spending by creating separate events for trips, projects, or any occasion.</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full">
                    <PieChart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-headline">Log Expenses Instantly</h3>
                <p className="text-muted-foreground">Quickly add expenses with our simple form, and see them updated in real-time.</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full">
                    <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-headline">Visualize Your Spending</h3>
                <p className="text-muted-foreground">Interactive charts and dashboards break down expenses by category and over time.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="bg-primary text-primary-foreground rounded-2xl p-10 md:p-16 text-center shadow-xl">
              <div className="space-y-6 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold font-headline tracking-tight lg:text-4xl">
                  Ready to Take Control of Your Finances?
                </h2>
                <p className="text-lg text-primary-foreground/90">
                  Join thousands of users who've transformed their expense tracking. Start your journey to better financial management today.
                </p>
                <div className="pt-4">
                    <Button 
                        asChild 
                        size="lg" 
                        variant="secondary"
                        className="text-lg px-10 py-6 rounded-full font-semibold"
                    >
                        <Link href="/login">
                        Start for Free
                        <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-8 bg-background border-t">
          <div className="container px-4 md:px-6 flex justify-center items-center">
              <p className="text-sm text-muted-foreground">
                © 2024 FinFlow. All rights reserved.
              </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
