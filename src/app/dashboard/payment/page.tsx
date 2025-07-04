'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CreditCard, Landmark, Wallet } from 'lucide-react';

const planDetails = {
  monthly: { name: 'Monthly Plan', price: '$9.99' },
  yearly: { name: 'Yearly Plan', price: '$99.00' },
};

function PaymentForm() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') as keyof typeof planDetails | null;
  const selectedPlan = plan ? planDetails[plan] : null;

  if (!selectedPlan) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>No subscription plan selected. Please go back and choose a plan.</p>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Payment</CardTitle>
        <CardDescription>
          You have selected the{' '}
          <span className="font-semibold text-primary">
            {selectedPlan.name}
          </span>{' '}
          for{' '}
          <span className="font-semibold text-primary">
            {selectedPlan.price}
          </span>
          .
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="card">
              <CreditCard className="mr-2 h-4 w-4" /> Card
            </TabsTrigger>
            <TabsTrigger value="upi">
              <Wallet className="mr-2 h-4 w-4" /> UPI
            </TabsTrigger>
            <TabsTrigger value="netbanking">
              <Landmark className="mr-2 h-4 w-4" /> Net Banking
            </TabsTrigger>
          </TabsList>
          <TabsContent value="card">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name-on-card">Name on Card</Label>
                <Input id="name-on-card" placeholder="John Doe" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="upi">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="upi-id">UPI ID</Label>
                <Input id="upi-id" placeholder="yourname@bank" />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Or scan QR code in your UPI app
              </p>
              <div className="flex justify-center">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rounded-md border"
                >
                  <rect width="100" height="100" fill="white" />
                  <rect x="8" y="8" width="30" height="30" fill="black" />
                  <rect x="13" y="13" width="20" height="20" fill="white" />
                  <rect x="18" y="18" width="10" height="10" fill="black" />
                  <rect x="62" y="8" width="30" height="30" fill="black" />
                  <rect x="67" y="13" width="20" height="20" fill="white" />
                  <rect x="72" y="18" width="10" height="10" fill="black" />
                  <rect x="8" y="62" width="30" height="30" fill="black" />
                  <rect x="13" y="67" width="20" height="20" fill="white" />
                  <rect x="18" y="72" width="10" height="10" fill="black" />
                  <path
                    fill="black"
                    d="M40 8 h5 v5 h-5z M48 8 h5 v5 h-5z M56 8 h5 v5 h-5z M40 16 h5 v5 h-5z M56 16 h5 v5 h-5z M40 24 h5 v5 h-5z M48 24 h5 v5 h-5z M56 24 h5 v5 h-5z M40 32 h5 v5 h-5z M48 32 h5 v5 h-5z M8 40 h5 v5 h-5z M16 40 h5 v5 h-5z M24 40 h5 v5 h-5z M32 40 h5 v5 h-5z M8 48 h5 v5 h-5z M24 48 h5 v5 h-5z M8 56 h5 v5 h-5z M16 56 h5 v5 h-5z M24 56 h5 v5 h-5z M32 56 h5 v5 h-5z M8 84 h5 v5 h-5z M16 84 h5 v5 h-5z M24 84 h5 v5 h-5z M32 84 h5 v5 h-5z M40 84 h5 v5 h-5z M48 84 h5 v5 h-5z M56 84 h5 v5 h-5z M64 84 h5 v5 h-5z M72 84 h5 v5 h-5z M80 84 h5 v5 h-5z M88 84 h5 v5 h-5z M40 76 h5 v5 h-5z M48 76 h5 v5 h-5z M56 76 h5 v5 h-5z M64 76 h5 v5 h-5z M72 76 h5 v5 h-5z M80 76 h5 v5 h-5z M88 76 h5 v5 h-5z M88 68 h5 v5 h-5z M88 60 h5 v5 h-5z M88 52 h5 v5 h-5z M88 44 h5 v5 h-5z M88 36 h5 v5 h-5z M88 28 h5 v5 h-5z M88 20 h5 v5 h-5z M88 12 h5 v5 h-5z M80 12 h5 v5 h-5z M72 20 h5 v5 h-5z M64 28 h5 v5 h-5z M72 36 h5 v5 h-5z M80 44 h5 v5 h-5z M64 52 h5 v5 h-5z M72 60 h5 v5 h-5z M80 68 h5 v5 h-5z M64 68 h5 v5 h-5z M40 60 h5 v5 h-5z M56 44 h5 v5 h-5z"
                  />
                </svg>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="netbanking">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="bank">Select your bank</Label>
                <Select>
                  <SelectTrigger id="bank">
                    <SelectValue placeholder="Choose a bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank1">State Bank of India</SelectItem>
                    <SelectItem value="bank2">Axis Bank</SelectItem>
                    <SelectItem value="bank3">HDFC Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Pay {selectedPlan.price}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentForm />
    </Suspense>
  );
}
