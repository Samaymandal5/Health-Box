import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb, Droplets, Bed, Footprints, Smile } from "lucide-react";

const wellnessTips = [
  {
    icon: Droplets,
    title: "Stay Hydrated",
    content: "Drink at least 8 glasses of water a day to keep your body functioning optimally. Hydration improves energy levels, brain function, and skin health.",
    color: "text-blue-500",
  },
  {
    icon: Bed,
    title: "Prioritize Sleep",
    content: "Aim for 7-9 hours of quality sleep per night. Good sleep is crucial for physical and mental health, helping to repair your body and consolidate memories.",
    color: "text-indigo-500",
  },
  {
    icon: Footprints,
    title: "Move Your Body",
    content: "Incorporate at least 30 minutes of moderate physical activity into your daily routine. Exercise boosts mood, strengthens bones, and reduces health risks.",
    color: "text-green-500",
  },
  {
    icon: Smile,
    title: "Practice Mindfulness",
    content: "Take a few minutes each day to practice mindfulness or meditation. It can help reduce stress, improve focus, and increase self-awareness.",
    color: "text-purple-500",
  },
  {
    icon: Lightbulb,
    title: "Eat a Balanced Diet",
    content: "Fuel your body with a variety of nutrient-rich foods, including fruits, vegetables, lean proteins, and whole grains. A balanced diet supports overall wellness.",
    color: "text-orange-500",
  },
   {
    icon: Lightbulb,
    title: "Connect with Others",
    content: "Nurture your social connections. Spending quality time with friends and family can improve your mood and provide a strong support system.",
    color: "text-pink-500",
  },
];

export default function WellnessCornerPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Wellness Corner
        </h1>
      </div>
      <p className="text-muted-foreground">
        A curated library of health and wellness tips to support your well-being.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {wellnessTips.map((tip, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="flex-row items-center gap-4 space-y-0">
               <tip.icon className={`w-10 h-10 ${tip.color}`} />
              <CardTitle>{tip.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{tip.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
