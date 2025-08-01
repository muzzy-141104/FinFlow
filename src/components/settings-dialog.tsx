
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

type SettingsDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function SettingsDialog({ isOpen, onOpenChange }: SettingsDialogProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { toast } = useToast();

  const handleClearData = () => {
    try {
        if(typeof window !== "undefined"){
            window.localStorage.removeItem("events");
            toast({
              title: "Data Cleared",
              description: "All your event data has been successfully deleted.",
            });
            // Reload to reflect changes, since useLocalStorage won't update across components otherwise
            window.location.reload(); 
        }
    } catch(e) {
        toast({
            title: "Error",
            description: "Could not clear data.",
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
                    all your event and expense data from your browser's local
                    storage.
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
