"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { findDoctors, FindDoctorsInput, FindDoctorsOutput } from "@/ai/flows/find-doctors";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "../ui/skeleton";
import { MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

// Using the exported schema from the flow
import { FindDoctorsInputSchema } from "@/ai/flows/find-doctors";

export function FindDoctors() {
  const [results, setResults] = useState<FindDoctorsOutput['results'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FindDoctorsInput>({
    resolver: zodResolver(FindDoctorsInputSchema),
    defaultValues: {
      problem: "",
      town: "",
      city: "",
      state: "",
    },
  });

  async function onSubmit(values: FindDoctorsInput) {
    setIsLoading(true);
    setResults(null);
    try {
      const response = await findDoctors(values);
      setResults(response.results);
       if (response.results.length === 0) {
        toast({
          title: "No Results",
          description: "We couldn't find any doctors or hospitals matching your criteria.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to find medical services. Please try again.",
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
          <CardTitle>Find Doctors & Hospitals</CardTitle>
          <CardDescription>
            Enter your problem and location to find nearby medical services.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="problem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Problem or Specialty</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'cardiologist' or 'chest pain'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="town"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Town / Area</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Downtown'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 'Springfield'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 'IL'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Searching..." : "Find Services"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
          <CardDescription>
            Here are the medical services we found for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 border rounded-lg space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          )}
          {!isLoading && !results && (
            <div className="text-sm text-muted-foreground text-center py-8">
              Your search results will appear here.
            </div>
          )}
           {!isLoading && results && results.length === 0 && (
            <div className="text-sm text-muted-foreground text-center py-8">
              No matching doctors or hospitals found.
            </div>
          )}
          {!isLoading && results && results.length > 0 && (
            <div className="space-y-4">
              {results.map((result, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{result.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-1 shrink-0" />
                    <span>{result.address}</span>
                  </CardContent>
                  <CardFooter>
                     <Button asChild variant="outline" size="sm" className="w-full">
                       <Link href={result.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                         View on Google Maps
                         <ExternalLink className="ml-2 h-4 w-4" />
                       </Link>
                     </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
