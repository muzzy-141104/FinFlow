
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, PieChart, TrendingUp, DollarSign, CreditCard, BarChart3 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// Framer Motion (or a similar library) would simplify this, but for the sake of no dependencies:
// We'll create a simplified motion-like component structure for animations.

const motion = {
  div: React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & { initial?: any; animate?: any; transition?: any; whileHover?: any; whileTap?: any; onMouseEnter?: any; onMouseLeave?: any; style?: any; variants?: any; viewport?: any; whileInView?: any }>(({ children, ...props }, ref) => {
    // Basic implementation detail: This component doesn't actually animate on its own
    // without a library, but it mimics the structure for easier replacement later.
    // The real animation will be driven by CSS or custom hooks.
    return <div ref={ref} {...props}>{children}</div>;
  }),
};

// 3D Floating Coins Component
const FloatingCoins = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const coins: any[] = [];
        const coinCount = 15;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        // Initialize coins
        for (let i = 0; i < coinCount; i++) {
            coins.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 30 + 20,
                speedX: (Math.random() - 0.5) * 1,
                speedY: (Math.random() - 0.5) * 1,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 2,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            coins.forEach(coin => {
                coin.x += coin.speedX;
                coin.y += coin.speedY;
                coin.rotation += coin.rotationSpeed;
                
                // Bounce off edges
                if (coin.x < 0 || coin.x > canvas.width) coin.speedX *= -1;
                if (coin.y < 0 || coin.y > canvas.height) coin.speedY *= -1;
                
                ctx.save();
                ctx.translate(coin.x, coin.y);
                ctx.rotate((coin.rotation * Math.PI) / 180);
                ctx.globalAlpha = coin.opacity;
                
                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, coin.size * 0.5);
                gradient.addColorStop(0, '#FFD700');
                gradient.addColorStop(0.7, '#FFA500');
                gradient.addColorStop(1, '#FF8C00');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.ellipse(0, 0, coin.size * 0.45, coin.size * 0.45, 0, 0, 2 * Math.PI);
                ctx.fill();
                
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.font = `${coin.size * 0.5}px bold Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('$', 0, 1);
                
                ctx.restore();
            });
            
            animationFrameId = requestAnimationFrame(animate);
        };
        
        animate();

        const handleResize = () => {
          if (canvas) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
          }
        }
        window.addEventListener('resize', handleResize);

        return () => {
          cancelAnimationFrame(animationFrameId);
          window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full pointer-events-none opacity-20"
            style={{ mixBlendMode: 'multiply' }}
        />
    );
};


// 3D Credit Card Component
const CreditCard3D = ({ className = "" }) => {
    return (
        <div
            className={`group relative w-64 h-40 mx-auto cursor-pointer ${className}`}
            style={{ perspective: '1000px' }}
        >
            <div
                className="relative w-full h-full rounded-xl shadow-2xl transition-transform duration-500 group-hover:[transform:rotateY(10deg)_rotateX(-5deg)_scale(1.05)]"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Card front */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl p-6 text-white flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-8 bg-yellow-400 rounded-md opacity-80"></div>
                        <Wallet className="w-8 h-8 opacity-60" />
                    </div>
                    <div>
                        <div className="text-lg font-mono tracking-wider">
                            •••• •••• •••• 1234
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                            <span>FINFLOW USER</span>
                            <span>12/28</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersecting(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`flex flex-col items-center space-y-4 p-6 rounded-2xl bg-card/50 transition-all duration-500 hover:shadow-2xl hover:bg-card hover:-translate-y-2 ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
                perspective: '800px',
                transitionDelay: `${delay}ms`,
            }}
        >
            <div className="p-4 bg-primary/10 rounded-full transition-transform duration-300 group-hover:scale-110">
                {icon}
            </div>
            <h3 className="text-xl font-bold font-headline">{title}</h3>
            <p className="text-muted-foreground text-center">{description}</p>
        </div>
    );
};


export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-background">
            <main className="flex-1">
                {/* Hero Section */}
                <section className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-primary/5 dark:via-background dark:to-background" />
                    
                    <FloatingCoins />
                    
                    <div className="container px-4 md:px-6 relative z-10">
                        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                            <div className="space-y-6">
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
                                    <Button asChild size="lg" className="group bg-primary shadow-lg text-lg px-8 py-6 rounded-full transition-transform hover:scale-105 active:scale-95">
                                        <Link href="/login">
                                            Get Started Free
                                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            
                            <div
                                className="relative w-full h-[20rem] md:h-[24rem] lg:h-[28rem]"
                                style={{ perspective: '1000px' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-purple-600/10 rounded-2xl backdrop-blur-sm border border-white/20 shadow-2xl flex items-center justify-center">
                                    <CreditCard3D />
                                </div>
                            </div>
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
                            <FeatureCard 
                                icon={<Wallet className="w-8 h-8 text-primary" />}
                                title="Create & Manage Events"
                                description="Organize your spending by creating separate events for trips, projects, or any occasion."
                                delay={0}
                            />
                             <FeatureCard 
                                icon={<PieChart className="w-8 h-8 text-primary" />}
                                title="Log Expenses Instantly"
                                description="Quickly add expenses with our simple form, and watch them appear in real-time."
                                delay={200}
                            />
                             <FeatureCard 
                                icon={<TrendingUp className="w-8 h-8 text-primary" />}
                                title="Visualize Your Spending"
                                description="Interactive charts and dashboards break down expenses by category and over time."
                                delay={400}
                            />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full py-20 md:py-28">
                    <div className="container px-4 md:px-6">
                        <div className="bg-primary text-primary-foreground rounded-2xl p-10 md:p-16 text-center shadow-xl overflow-hidden relative">
                           
                            <div className="space-y-6 max-w-2xl mx-auto relative z-10">
                                <h2 className="text-3xl font-bold font-headline tracking-tight lg:text-4xl">
                                    Ready to Take Control of Your Finances?
                                </h2>
                                <p className="text-lg text-primary-foreground/90">
                                    Start your journey to better financial management today - completely free!
                                </p>
                                <div className="pt-4">
                                  <Button asChild size="lg" variant="secondary" className="text-lg px-10 py-6 rounded-full font-semibold shadow-lg transition-transform hover:scale-105 active:scale-95">
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
