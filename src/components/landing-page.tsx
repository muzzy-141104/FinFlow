
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, PieChart, TrendingUp, Github } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

// 3D Floating Coins Component using Canvas
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
                ctx.font = `${'${coin.size * 0.5}'}px bold Arial`;
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


// 3D Animated Wallet Component
const AnimatedWallet = ({ className = "" }) => {
    return (
        <div
            className={`group relative w-64 h-64 mx-auto cursor-pointer ${'${className}'}`}
            style={{ perspective: '1000px' }}
        >
            <div
                className="relative w-full h-full transition-transform duration-500 group-hover:[transform:rotateY(10deg)_rotateX(-10deg)_scale(1.1)]"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Main Wallet Body */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="w-48 h-36 bg-primary rounded-xl shadow-2xl flex items-center justify-center relative overflow-hidden"
                        style={{ transform: 'translateZ(20px)' }}
                    >
                         <div className="absolute w-full h-1/3 top-0 bg-black/10"></div>
                        <Wallet className="w-20 h-20 text-primary-foreground opacity-80" />
                    </div>
                </div>
                
                {/* Revolving Coins Layer 1 */}
                <div className="absolute inset-0 w-full h-full" style={{ transformStyle: 'preserve-3d', animation: 'spin 12s linear infinite' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-lg" style={{ transform: 'rotateY(70deg) translateZ(120px)' }}>
                        <span className="text-amber-800 font-bold text-sm">$</span>
                    </div>
                </div>

                {/* Revolving Coins Layer 2 */}
                <div className="absolute inset-0 w-full h-full" style={{ transformStyle: 'preserve-3d', animation: 'spin 15s linear infinite reverse' }}>
                     <div className="absolute bottom-10 left-1/4 -translate-x-1/2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-lg" style={{ transform: 'rotateY(-60deg) translateZ(110px)' }}>
                        <span className="text-amber-800 font-bold text-xs">$</span>
                    </div>
                </div>

                 {/* Revolving Coins Layer 3 */}
                 <div className="absolute inset-0 w-full h-full" style={{ transformStyle: 'preserve-3d', animation: 'spin 10s linear infinite' }}>
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center shadow-lg" style={{ transform: 'rotateY(90deg) translateZ(130px)' }}>
                         <span className="text-amber-800 font-bold text-sm">$</span>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes spin {
                        from { transform: rotateY(0deg); }
                        to { transform: rotateY(360deg); }
                    }
                `}</style>
            </div>
        </div>
    );
};

const AnimatedFeatureIcon = ({ feature }: { feature: string }) => {
    if (feature === 'wallet') {
        return (
            <div className="w-24 h-24" style={{ perspective: '800px' }}>
                <div className="relative w-full h-full transition-transform duration-500 group-hover:[transform:rotateY(15deg)_rotateX(-15deg)]" style={{ transformStyle: 'preserve-3d' }}>
                    <div className="absolute w-20 h-16 bg-primary rounded-lg shadow-lg flex items-center justify-center" style={{ transform: 'translateZ(10px)'}}>
                        <Wallet className="w-10 h-10 text-primary-foreground opacity-90" />
                    </div>
                </div>
            </div>
        )
    }
    if (feature === 'pie') {
        return (
            <div className="w-24 h-24" style={{ perspective: '800px' }}>
                 <div className="relative w-full h-full transition-transform duration-500 group-hover:[transform:rotateY(15deg)_rotateX(-15deg)] group-hover:scale-110" style={{ transformStyle: 'preserve-3d' }}>
                    <PieChart className="w-full h-full text-primary opacity-80" style={{ transform: 'rotateZ(-30deg)' }} />
                    <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-accent rounded-full" style={{ clipPath: 'polygon(100% 0, 0 0, 0 100%)', transform: 'translateZ(15px) rotate(45deg) scale(0.8)' }}></div>
                 </div>
            </div>
        )
    }
    if (feature === 'bars') {
        return (
            <div className="w-24 h-24 flex items-end justify-center gap-2" style={{ perspective: '800px' }}>
                 <div className="relative w-full h-full transition-transform duration-500 group-hover:[transform:rotateY(15deg)_rotateX(-15deg)] group-hover:scale-110 flex items-end justify-center gap-2" style={{ transformStyle: 'preserve-3d' }}>
                    <div className="w-4 h-1/2 bg-primary rounded-t-sm animate-bar-grow" style={{ animationDelay: '0s' }}></div>
                    <div className="w-4 h-3/4 bg-accent rounded-t-sm animate-bar-grow" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-4 h-1/3 bg-primary/70 rounded-t-sm animate-bar-grow" style={{ animationDelay: '0.4s' }}></div>
                 </div>
                 <style jsx>{`
                    @keyframes bar-grow {
                        from { transform: scaleY(0); }
                        to { transform: scaleY(1); }
                    }
                    .animate-bar-grow {
                        transform-origin: bottom;
                        animation: bar-grow 0.5s ease-out forwards;
                    }
                 `}</style>
            </div>
        )
    }
    return null;
}


const FeatureCard = ({ icon, title, description, delay, feature }: { icon: React.ReactNode, title: string, description: string, delay: number, feature: string }) => {
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
                transitionDelay: `${'${delay}'}ms`,
            }}
        >
            <div className="h-24 w-24 flex items-center justify-center">
                 <AnimatedFeatureIcon feature={feature} />
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
                                className="relative w-full h-[20rem] md:h-[24rem] lg:h-[28rem] flex items-center justify-center"
                                style={{ perspective: '1000px' }}
                            >
                                <AnimatedWallet />
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
                                feature="wallet"
                            />
                             <FeatureCard 
                                icon={<PieChart className="w-8 h-8 text-primary" />}
                                title="Log Expenses Instantly"
                                description="Quickly add expenses with our simple form, and watch them appear in real-time."
                                delay={200}
                                feature="pie"
                            />
                             <FeatureCard 
                                icon={<TrendingUp className="w-8 h-8 text-primary" />}
                                title="Visualize Your Spending"
                                description="Interactive charts and dashboards break down expenses by category and over time."
                                delay={400}
                                feature="bars"
                            />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="w-full py-20 md:py-28">
                    <div className="container px-4 md:px-6">
                        <div className="bg-primary text-primary-foreground rounded-2xl p-10 md:p-16 text-center shadow-xl overflow-hidden relative">
                            {/* Animated background elements */}
                            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2" style={{ filter: 'blur(60px)', animation: 'pulse 8s infinite' }}></div>
                            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full opacity-50 translate-x-1/2 translate-y-1/2" style={{ filter: 'blur(80px)', animation: 'pulse 10s infinite reverse' }}></div>
                            
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
                <style jsx>{`
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); opacity: 0.5; }
                        50% { transform: scale(1.2); opacity: 0.3; }
                    }
                `}</style>
                {/* Footer */}
                <footer className="w-full py-8 bg-background border-t">
                    <div className="container px-4 md:px-6 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <p className="text-sm text-muted-foreground text-center">
                            © 2024 FinFlow. All rights reserved.
                        </p>
                        <div className="hidden sm:block border-l h-4 border-muted-foreground/50"></div>
                        <a href="https://github.com/google-gemini" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2">
                           <Github className="w-4 h-4" /> Created by The Gemini Team
                        </a>
                    </div>
                </footer>
            </main>
        </div>
    );
}
