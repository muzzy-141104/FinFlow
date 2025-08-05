"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, BarChart, ArrowRight, Star, Sparkles, ShieldCheck, PieChart } from "lucide-react";
import { motion } from "framer-motion";

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-28 md:py-40 lg:py-52 bg-gradient-to-br from-indigo-50 via-white to-white dark:from-primary/5 dark:via-background dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-14 lg:grid-cols-2 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl md:text-7xl text-foreground font-headline tracking-tight">
                  Effortless Expense Tracking for Any Event.
                </h1>
                <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
                  From vacations to projects, FinFlow helps you manage shared expenses with ease. Create events, track spending, and see where your money goes.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" className="group shadow-lg">
                    <Link href="/login">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="relative w-full h-[24rem] md:h-[28rem] lg:h-[32rem] rounded-3xl shadow-2xl overflow-hidden group"
              >
                <Image
                  src={"/placeholders/event-1.jpg"}
                  width={800}
                  height={600}
                  alt="Dashboard preview for expense tracking"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint="planning travel budget"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-28 lg:py-36 bg-muted/30 dark:bg-muted/10">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center space-y-4 mb-14"
            >
              <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
                Core Features
              </span>
              <h2 className="text-4xl font-bold sm:text-5xl tracking-tight font-headline">
                Everything You Need to Stay on Budget
              </h2>
              <p className="max-w-3xl mx-auto text-muted-foreground md:text-lg">
                FinFlow provides powerful, easy-to-use tools to give you a clear view of your finances for any event or project.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Create & Manage Events",
                  desc: "Organize your spending by creating separate events for trips, projects, or any occasion.",
                  imgSrc: "/placeholders/1.png",
                  imgHint: "event planning",
                  icon: <Sparkles />,
                },
                {
                  title: "Log Expenses Instantly",
                  desc: "Quickly add expenses with categories, dates, and amounts to keep your records up-to-date.",
                  imgSrc: "/placeholders/2.png",
                  imgHint: "receipt transaction",
                  icon: <CheckCircle />,
                },
                {
                  title: "Visualize Your Spending",
                  desc: "Interactive charts break down your expenses by category, helping you understand your financial habits.",
                  imgSrc: "/placeholders/3.jpg",
                  imgHint: "financial chart",
                  icon: <PieChart />,
                },
                {
                  title: "All-in-One Analysis",
                  desc: "Get a high-level overview of your spending across all events with our powerful analysis dashboard.",
                  imgSrc: "/placeholders/4.jpg",
                  imgHint: "analytics dashboard",
                  icon: <BarChart />,
                },
                {
                  title: "Secure Authentication",
                  desc: "Your financial data is protected with secure sign-in via Google, powered by Firebase.",
                  imgSrc: "/placeholders/5.jpg",
                  imgHint: "data security",
                  icon: <ShieldCheck />,
                },
                {
                  title: "Download PDF Reports",
                  desc: "Easily export detailed expense reports for any event to a PDF for sharing or archiving.",
                  imgSrc: "/placeholders/6.jpg",
                  imgHint: "document report",
                  icon: <Users />,
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  <div className="relative h-48 w-full mb-6 rounded-xl overflow-hidden">
                    <Image
                      src={feature.imgSrc}
                      alt={feature.title}
                      fill
                      className="object-cover"
                      data-ai-hint={feature.imgHint}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold font-headline mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-20 md:py-28 lg:py-36">
          <div className="container grid items-center justify-center gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-24">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
                  Get Started in Minutes
                </span>
                <h2 className="text-4xl font-bold tracking-tight font-headline mt-4">How It Works</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                  Tracking your expenses with FinFlow is simple and intuitive. Follow these three easy steps to get started.
                </p>
              </motion.div>
              <motion.ul
                initial="hidden"
                whileInView="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.2 } },
                  hidden: {},
                }}
                className="space-y-6"
              >
                {[
                  {
                    title: "Create an Event",
                    desc: "Start by creating a new event for whatever you're planning, like a 'Vacation' or 'Home Renovation'.",
                  },
                  {
                    title: "Add Your Expenses",
                    desc: "As you spend, quickly add each expense to the relevant event. Categorize it for better tracking.",
                  },
                  {
                    title: "Analyze & Control",
                    desc: "Use the dashboard and charts to see where your money is going, helping you stay on budget.",
                  },
                ].map((step, i) => (
                  <motion.li
                    key={step.title}
                    variants={{
                      visible: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: -30 },
                    }}
                    transition={{ duration: 0.5 }}
                    className="flex"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mr-6">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground mt-1">{step.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full h-[24rem] md:h-[32rem] rounded-2xl shadow-xl overflow-hidden"
            >
              <Image
                src="/placeholders/event-8.jpg"
                alt="A person planning expenses"
                fill
                className="object-cover"
                data-ai-hint="planning budget desk"
              />
            </motion.div>
          </div>
        </section>


        {/* Testimonials Section */}
        <section className="w-full py-20 md:py-28 bg-muted/30 dark:bg-muted/10">
          <div className="container px-4 md:px-6">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-center"
              >
                <h2 className="text-4xl font-bold font-headline tracking-tight">Loved by Teams and Individuals</h2>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
                  See what our users are saying about how FinFlow has simplified their financial lives.
                </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
              {[
                {
                  name: "Sarah L.",
                  role: "Trip Organizer",
                  quote: "FinFlow was a lifesaver for our group vacation! It made tracking and splitting shared costs so simple. No more messy spreadsheets!",
                  avatar: "https://placehold.co/40x40.png",
                },
                {
                  name: "Mike R.",
                  role: "Freelancer",
                  quote: "I use this to track expenses for each of my client projects. The category breakdown is perfect for my business reports.",
                  avatar: "https://placehold.co/40x40.png",
                },
                {
                  name: "Jessica & Tom",
                  role: "Homeowners",
                  quote: "We planned our entire kitchen remodel budget with FinFlow. Seeing the totals in real-time kept us from overspending. Highly recommend!",
                  avatar: "https://placehold.co/40x40.png",
                },
              ].map((t) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-card p-8 rounded-2xl shadow-lg text-center"
                >
                  <div className="flex justify-center mb-4">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                    <Star className="h-5 w-5 text-yellow-400" />
                  </div>
                  <p className="text-foreground mb-6">"{t.quote}"</p>
                  <div className="flex items-center justify-center">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
