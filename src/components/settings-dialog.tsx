
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, writeBatch } from "firebase/firestore";

type SettingsDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function SettingsDialog({ isOpen, onOpenChange }: SettingsDialogProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleClearData = async () => {
    if (!user) {
        toast({ title: "Error", description: "You must be logged in to clear data.", variant: "destructive" });
        return;
    }
    
    try {
        const q = query(collection(db, "events"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            toast({ title: "No Data", description: "There is no data to clear." });
            setIsAlertOpen(false);
            onOpenChange(false);
            return;
        }

        const batch = writeBatch(db);
        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        toast({
          title: "Data Cleared",
          description: "All your event data has been successfully deleted.",
        });
        
    } catch(e) {
        console.error("Error clearing data: ", e);
        toast({
            title: "Error",
            description: "Could not clear data. Please try again.",
            variant: "destructive"
        })
    }
    setIsAlertOpen(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Application Settings</DialogTitle>
          <DialogDescription>
            Manage your application settings and data here.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <h3 className="mb-2 text-lg font-medium">Data Management</h3>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-semibold">Clear All Event Data</p>
              <p className="text-sm text-muted-foreground">
                This will permanently delete all your events and expenses.
              </p>
            </div>
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    <div className="flex items-center">
                        <AlertTriangle className="mr-2 h-6 w-6 text-destructive" />
                        Are you absolutely sure?
                    </div>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    all your event and expense data from the cloud.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearData}>
                    Yes, delete everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
