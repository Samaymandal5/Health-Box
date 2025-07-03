"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { medicineSuggestion } from "@/ai/flows/medicine-suggestion";

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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const formSchema = z.object({
  healthIssueDescription: z
    .string()
    .min(10, "Please describe your health issues in at least 10 characters."),
});

type Suggestion = {
  suggestedMedicines: string;
  disclaimer: string;
};

export function MedicineSuggestion() {
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      healthIssueDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await medicineSuggestion(values);
      setSuggestion(result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get suggestions. Please try again.",
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
          <CardTitle>Medicine Suggestion</CardTitle>
          <CardDescription>
            Describe your health issues to get over-the-counter medicine
            suggestions.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="healthIssueDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Health Issues</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I have a headache and a stuffy nose.'"
                        className="resize-none"
                        rows={6}
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
                {isLoading ? "Getting Suggestions..." : "Get Suggestions"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Suggestions</CardTitle>
          <CardDescription>
            Based on your description, here are some suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            </div>
          )}
          {suggestion && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Suggested Medicines:</h3>
                <p className="text-sm whitespace-pre-wrap">
                  {suggestion.suggestedMedicines}
                </p>
              </div>
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Disclaimer</AlertTitle>
                <AlertDescription>
                  {suggestion.disclaimer}
                </AlertDescription>
              </Alert>
            </div>
          )}
          {!isLoading && !suggestion && (
            <div className="text-sm text-muted-foreground">
              Your suggestions will appear here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
