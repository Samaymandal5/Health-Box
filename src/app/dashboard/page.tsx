import Link from "next/link";
import {
  BotMessageSquare,
  Pill,
  Salad,
  Dumbbell,
  BrainCircuit,
  HeartPulse,
  ArrowRight,
  Gem,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: BotMessageSquare,
    title: "Dr. AI Assistant",
    description: "Get preliminary medical guidance based on your symptoms.",
    link: "/dashboard/chat",
    color: "text-blue-500",
  },
  {
    icon: Pill,
    title: "Medicine Suggestion",
    description: "Find over-the-counter medicines for minor health issues.",
    link: "/dashboard/medicine-suggestion",
    color: "text-green-500",
  },
  {
    icon: Salad,
    title: "AI Diet Planner",
    description: "Receive personalized diet plans tailored to your needs.",
    link: "/dashboard/diet-planner",
    color: "text-orange-500",
  },
  {
    icon: Dumbbell,
    title: "Exercise Planner",
    description: "Customized workout routines for your fitness level and goals.",
    link: "/dashboard/exercise-planner",
    color: "text-red-500",
  },
  {
    icon: BrainCircuit,
    title: "Mental Health Support",
    description: "Manage stress and anxiety with AI-driven support.",
    link: "/dashboard/mental-health",
    color: "text-purple-500",
  },
  {
    icon: HeartPulse,
    title: "Wellness Corner",
    description: "Explore a library of tips for a healthier lifestyle.",
    link: "/dashboard/wellness-corner",
    color: "text-pink-500",
  },
  {
    icon: Gem,
    title: "Subscription Plans",
    description: "Unlock premium features with our monthly and yearly plans.",
    link: "/dashboard/subscription",
    color: "text-yellow-500",
  },
];

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Welcome to Your Health Dashboard
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="flex flex-col transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg"
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <feature.icon className={`w-10 h-10 ${feature.color}`} />
                <CardTitle>{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link href={feature.link}>
                  Explore Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
