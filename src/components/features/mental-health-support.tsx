"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getMentalHealthSupport } from "@/ai/flows/mental-health-support";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  feeling: z.string().min(2, "Please describe how you're feeling."),
  situation: z.string().min(2, "Please describe your situation."),
  preference: z.string().optional(),
});

type Support = {
  supportType: string;
  suggestions: string;
};

export function MentalHealthSupport() {
  const [support, setSupport] = useState<Support | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feeling: "",
      situation: "",
      preference: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSupport(null);
    try {
      const result = await getMentalHealthSupport(values);
      setSupport(result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get support. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Mental Health Support</CardTitle>
          <CardDescription>
            Share how you're feeling to receive support and strategies.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="feeling"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How are you feeling?</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Stressed, anxious" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="situation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What's the situation?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Upcoming exam, work pressure"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Support Preference (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Meditation, healthy thinking tips"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Getting Support..." : "Get Support"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Support & Strategies</CardTitle>
          <CardDescription>
            Here are some ways to manage your feelings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
          )}
          {support && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Support Type: {support.supportType}</h3>
                <p className="text-sm whitespace-pre-wrap">{support.suggestions}</p>
              </div>
            </div>
          )}
          {!isLoading && !support && (
            <div className="text-sm text-muted-foreground">
              Your support suggestions will appear here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
