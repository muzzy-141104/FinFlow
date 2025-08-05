
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { currencies, Currency } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const currencyKeys = Object.keys(currencies) as [Currency, ...Currency[]];

// 500KB file size limit to account for Base64 encoding overhead
const MAX_FILE_SIZE = 500 * 1024; 
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().optional(),
  currency: z.enum(currencyKeys),
  // The imageUrl is a base64 string, so we validate its length
  imageUrl: z.string().max(MAX_FILE_SIZE * 1.4, "Image must be less than 500KB.").optional(),
});

type AddEventFormProps = {
  onSave: (values: z.infer<typeof formSchema>) => void;
  onClose: () => void;
};

export function AddEventForm({ onSave, onClose }: AddEventFormProps) {
  const { toast } = useToast();
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      currency: "USD",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        form.setError("imageUrl", {
          type: "manual",
          message: "Image must be smaller than 500KB.",
        });
        setFileName(null);
        return;
      }
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        form.setError("imageUrl", {
            type: "manual",
            message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
        });
        setFileName(null);
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue("imageUrl", reader.result as string);
        form.clearErrors("imageUrl"); // Clear error if a valid file is selected
        setFileName(file.name);
      };
      reader.onerror = () => {
          toast({
              title: "Error Reading File",
              description: "Could not read the selected file. Please try again.",
              variant: "destructive",
          })
      }
      reader.readAsDataURL(file);
    }
  };


  function onSubmit(values: z.infer<typeof formSchema>) {
    onSave(values);
    form.reset();
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Summer Trip to Italy" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Currency</FormLabel>
                <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                >
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a currency" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {Object.entries(currencies).map(([code, { name, symbol }]) => (
                        <SelectItem key={code} value={code}>
                        {symbol} - {name}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A brief description of the event."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Image (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(",")}
                  onChange={handleFileChange}
                />
              </FormControl>
              <FormDescription>
                {fileName 
                  ? `Selected: ${fileName}`
                  : "Upload an image for your event. Max 500KB."
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit">Create Event</Button>
        </div>
      </form>
    </Form>
  );
}
