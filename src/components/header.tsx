"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Wallet, LogOut, Settings, Loader2 } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { useState, useMemo, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "./theme-toggle";
import { MonthlyExpenseChart } from "./monthly-expense-chart";
import { SettingsDialog } from "./settings-dialog";
import { type Event, type Expense } from "@/lib/types";

export function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);
  
  useEffect(() => {
    if (!user) {
        setAllExpenses([]);
        return;
    }

    const q = query(collection(db, "events"), where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const expenses: Expense[] = [];
        querySnapshot.forEach((doc) => {
            const eventData = doc.data() as Event;
            if (eventData.expenses) {
                expenses.push(...eventData.expenses);
            }
        });
        setAllExpenses(expenses);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Wallet className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold text-lg font-headline">
              FinFlow
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.photoURL || "https://placehold.co/40x40"} alt={user.displayName || "User"} data-ai-hint="user avatar" />
                      <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.displayName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div>
                      <p className="text-xs font-medium text-muted-foreground px-2 py-1.5">Monthly Overview</p>
                      <MonthlyExpenseChart expenses={allExpenses} />
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => setIsSettingsOpen(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </nav>
        </div>
      </div>
      <SettingsDialog isOpen={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </header>
  );
}
