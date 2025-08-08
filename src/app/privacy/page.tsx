
"use client"

import Link from 'next/link';
import { Sparkles, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden">
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
          <div className="container mx-auto flex items-center justify-between whitespace-nowrap px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="size-8 text-primary">
                <Sparkles className="h-full w-full" />
              </div>
              <h2 className="text-xl font-bold leading-tight tracking-tight text-foreground">CaptionCraft</h2>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/">Features</Link>
              <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/about">About</Link>
              <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/contact">Help</Link>
            </nav>
            <div className="flex items-center gap-4">
              <Button>
                Get Started
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden p-2 rounded-md hover:bg-accent">
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="max-w-4xl mx-auto">
            <header className="py-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">Privacy Policy</h1>
              <p className="mt-4 text-lg text-muted-foreground">Last updated: October 26, 2023</p>
            </header>
            <div className="card space-y-8 p-8 md:p-12 bg-card rounded-lg shadow-md">
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-foreground">1. Introduction</h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Welcome to CaptionCraft's Privacy Policy. This policy outlines how we collect, use, and protect your personal information when you use our caption generation services. By using CaptionCraft, you agree to the terms of this policy. We are committed to safeguarding your privacy and ensuring the security of your data.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-foreground">2. Data Collection</h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  We collect information you provide directly, such as your email address when you register, and content you upload for caption generation. We also collect usage data, including your interactions with our services, and device information, such as your IP address and browser type. This data helps us improve our services and personalize your experience.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-foreground">3. Data Usage</h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  The data we collect is used to provide and enhance our caption generation services, personalize your experience, communicate with you about updates or support, and ensure the security of our platform. We may also use aggregated, anonymized data for analytical purposes to understand user behavior and improve our offerings.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-foreground">4. Data Sharing</h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  We do not sell your personal information. We may share data with trusted third-party service providers who assist us in operating our services, such as hosting, analytics, and customer support. These providers are contractually obligated to protect your information and only use it for the purposes we specify. We may also disclose data if required by law or to protect our rights and safety.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-foreground">5. Data Protection</h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  We implement robust security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, and regular security assessments. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-foreground">6. User Rights</h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your data. To exercise these rights, please contact us using the information provided below. We will respond to your request within a reasonable timeframe. You can manage your data in your account settings.
                </p>
              </section>
              <section className="mb-0">
                <h2 className="text-2xl font-semibold mb-3 text-foreground">7. Contact Information</h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                  <a className="text-primary hover:underline" href="mailto:support@captioncraft.com">support@captioncraft.com</a>. We are here to assist you with any inquiries you may have.
                </p>
              </section>
            </div>
          </div>
        </main>
        <footer className="bg-muted/30 mt-16">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="flex items-center gap-4">
                <div className="size-6 text-primary">
                  <Sparkles className="h-full w-full" />
                </div>
                <h2 className="text-lg font-bold text-foreground">CaptionCraft</h2>
              </div>
              <div className="mt-4 flex gap-6 md:mt-0">
                <Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="/terms">Terms of Service</Link>
                <Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="/privacy">Privacy Policy</Link>
                <Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="/contact">Contact Us</Link>
              </div>
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">© 2024 CaptionCraft. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
