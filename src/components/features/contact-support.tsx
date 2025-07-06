'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function ContactSupport() {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // Close the dialog when the mail client is opened, after a short delay.
    setTimeout(() => {
        setOpen(false);
    }, 500);
  }

  const mailtoLink = `mailto:samaymandal5@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(message)}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full">
          Contact Support
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
          <DialogTitle>Contact Support</DialogTitle>
          <DialogDescription>
              Fill out the form below. Clicking "Send Message" will open your default email client.
          </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
              Subject
              </Label>
              <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Issue with login"
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
              Message
              </Label>
              <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="col-span-3"
              placeholder="Please describe your issue in detail."
              rows={5}
              />
          </div>
          </div>
          <DialogFooter>
            <Button asChild disabled={!subject || !message}>
                <Link href={mailtoLink} onClick={handleSend} target="_blank" rel="noopener noreferrer">Send Message</Link>
            </Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
