import Link from 'next/link';
import { Facebook, Instagram, Mail, MapPin, Twitter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
// Note: Unused imports 'Sparkles', 'Menu', 'Sheet', 'SheetContent', 'SheetTrigger' were removed.

export default function ContactPage() {
  return (
    // The root container uses flexbox to structure the page vertically.
    // - `min-h-screen`: Ensures the page is at least as tall as the viewport.
    // - `flex flex-col`: Stacks the children (<main> and <footer>) vertically.
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground bg-grid-gray-700/[0.2]">
      
      {/* The main content area.
        - `flex-grow`: This is the key. It tells this element to expand and fill all
          available vertical space, which pushes the footer to the very bottom.
        - `flex items-center`: This centers the content grid vertically within the main area.
        - `py-16`: Increased vertical padding for better spacing above and below the content.
      */}
      <main className="container mx-auto flex flex-grow items-center px-4 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2">
          
          {/* Left Column: Information */}
          <div className="space-y-6 text-center md:text-left">
            <h2 className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
              Let's Connect
            </h2>
            <p className="text-xl leading-relaxed text-muted-foreground">
              Have a question, feedback, or a partnership idea? We're all ears. Reach out and our team will get back to you as soon as possible.
            </p>
            <div className="space-y-6 pt-6">
              <div className="flex items-center justify-center gap-4 md:justify-start">
                <Mail className="h-6 w-6 text-primary" />
                <span className="text-lg">support@captioncraft.ai</span>
              </div>
              <div className="flex items-center justify-center gap-4 md:justify-start">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-lg">San Francisco, CA</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 pt-8 md:justify-start">
              <Link href="/twitter" className="text-muted-foreground transition-transform duration-300 hover:scale-110 hover:text-primary">
                <Twitter className="h-7 w-7" />
              </Link>
              <Link href="/instagram" className="text-muted-foreground transition-transform duration-300 hover:scale-110 hover:text-primary">
                <Instagram className="h-7 w-7" />
              </Link>
              <Link href="/facebook" className="text-muted-foreground transition-transform duration-300 hover:scale-110 hover:text-primary">
                <Facebook className="h-7 w-7" />
              </Link>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="rounded-xl bg-card p-8 shadow-lg">
            <form>
              <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground" htmlFor="name">Name</label>
                  <Input id="name" name="name" placeholder="Anakin Skywalker" type="text" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground" htmlFor="email">Email</label>
                  <Input id="email" name="email" placeholder="chosenone@galaxy.net" type="email" />
                </div>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-muted-foreground" htmlFor="subject">Subject</label>
                <Input id="subject" name="subject" placeholder="I have the high ground" type="text" />
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-muted-foreground" htmlFor="message">Message</label>
                <Textarea id="message" name="message" placeholder="You underestimate my power!" rows={5} />
              </div>
              <Button className="w-full" type="submit">Send Message</Button>
            </form>
          </div>

        </div>
      </main>

      {/* Footer Section.
        - The problematic `mt-16` class has been REMOVED.
        - The space above the footer is now correctly handled by the bottom padding of the `<main>` element.
      */}
      <footer className="bg-transparent">
        <div className="container mx-auto px-6 py-8 text-center text-muted-foreground">
          <p>© 2024 CaptionCraft. All rights reserved. Powered by AI, crafted by humans.</p>
        </div>
      </footer>
    </div>
  );
}