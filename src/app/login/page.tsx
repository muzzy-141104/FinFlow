"use client";

import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Wallet } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" width="24" height="24">
  <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34-4.6-50.2H272v95h147.4c-6.4 34.7-25.5 64.1-54.5 83.7v69.5h87.9c51.5-47.5 80.7-117.5 80.7-198z"/>
  <path fill="#34A853" d="M272 544.3c73.8 0 135.7-24.5 180.9-66.6l-87.9-69.5c-24.4 16.4-55.6 26-93 26-71.4 0-132-48.1-153.6-112.8H27.4v70.8c45.1 89.3 138.3 151.1 244.6 151.1z"/>
  <path fill="#FBBC05" d="M118.4 321.4c-10.2-30.7-10.2-63.8 0-94.5v-70.8H27.4c-37.6 74.5-37.6 161.5 0 236z"/>
  <path fill="#EA4335" d="M272 107.7c39.9-.6 78 14.5 106.9 41.2l80-80C412.9 24.2 345.3-.1 272 0 165.7 0 72.5 61.8 27.4 151.1l91 70.8C140 155.8 200.6 107.7 272 107.7z"/>
  </svg>

);

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error: any) {
      // Don't show an error if the user closes the popup
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        return;
      }
      
      console.error("Error signing in with Google: ", error);
      toast({
        title: "Sign-in Failed",
        description: "Could not sign in with Google. Please try again.",
        variant: "destructive"
      })
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <Wallet className="h-8 w-8 text-primary" />
            <span className="ml-2 text-2xl font-bold font-headline">FinFlow</span>
          </div>
          <CardTitle className="text-2xl text-center">Welcome to FinFlow</CardTitle>
          <CardDescription className="text-center">
            Sign in with your Google account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
              <GoogleIcon className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
