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
import Image from 'next/image';

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
                 <Image src="https://placehold.co/200x200.png" alt="QR Code" data-ai-hint="qr code" width={200} height={200} />
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
                    <SelectItem value="bank1">Bank of America</SelectItem>
                    <SelectItem value="bank2">Chase Bank</SelectItem>
                    <SelectItem value="bank3">Wells Fargo</SelectItem>
                    <SelectItem value="bank4">Citibank</SelectItem>
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