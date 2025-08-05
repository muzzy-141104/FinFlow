"use client";

import { Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

type LoadingSpinnerProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

export const LoadingSpinner = ({ className, size = 'md' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };
  const walletSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }
  const coinSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }


  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className={cn('relative', sizeClasses[size])}>
        <Wallet className={cn('absolute bottom-0 left-1/2 -translate-x-1/2 text-primary', walletSizeClasses[size])} />
        <div 
          className={cn('absolute left-1/2 -translate-x-1/2 bg-amber-400 rounded-full animate-coin-drop shadow-lg', coinSizeClasses[size])}
          style={{ animationName: 'coin-drop' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-amber-800 font-bold">$</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes coin-drop {
          0% {
            transform: translateY(-100%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(0) scale(1.2);
          }
          90% {
            transform: translateY(20%) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translateY(20%) scale(0.5);
            opacity: 0;
          }
        }
        .animate-coin-drop {
          animation: coin-drop 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
