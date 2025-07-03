import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const monthlyPlan = {
  name: "Monthly Plan",
  price: "₹399",
  period: "/month",
  features: [
    "Unlimited AI Assistant access",
    "Personalized diet and exercise plans",
    "Medicine suggestions",
    "Mental health support",
    "Priority support",
  ],
};

const yearlyPlan = {
  name: "Yearly Plan",
  price: "₹3999",
  period: "/year",
  features: [
    "All features from Monthly Plan",
    "Save over 15%",
    "Year-round wellness tracking",
    "Exclusive access to new features",
  ],
  isPopular: true,
};

export default function SubscriptionPage() {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">Choose Your Plan</h1>
        <p className="text-muted-foreground mt-2">
          Unlock premium features and take control of your health journey.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Card className="flex flex-col rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle>{monthlyPlan.name}</CardTitle>
            <CardDescription>Perfect for getting started.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-6">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">{monthlyPlan.price}</span>
              <span className="text-muted-foreground ml-1">
                {monthlyPlan.period}
              </span>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              {monthlyPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">Choose Plan</Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-primary relative">
           {yearlyPlan.isPopular && (
            <div className="absolute top-0 right-4 -mt-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Popular
            </div>
          )}
          <CardHeader>
            <CardTitle>{yearlyPlan.name}</CardTitle>
            <CardDescription>Best value for long-term commitment.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-6">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">{yearlyPlan.price}</span>
              <span className="text-muted-foreground ml-1">
                {yearlyPlan.period}
              </span>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              {yearlyPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Choose Plan</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
