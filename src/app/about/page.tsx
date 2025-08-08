import Link from 'next/link';
import { Sparkles, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <main className="flex-grow">
        <section className="py-24 md:py-32 relative overflow-hidden bg-background">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-black opacity-50"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute -top-1/2 -left-1/4 w-[50rem] h-[50rem] rounded-full bg-gradient-radial from-primary to-transparent blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-1/2 -right-1/4 w-[50rem] h-[50rem] rounded-full bg-gradient-radial from-accent to-transparent blur-3xl animate-pulse delay-1000"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 text-center tracking-tight">We're crafting the future <br /> of digital expression.</h1>
            <p className="text-muted-foreground leading-relaxed text-lg text-center max-w-3xl mx-auto md:text-xl">
              We're a passionate crew of creators, developers, and AI enthusiasts on a mission to revolutionize the way you craft captions. In a world saturated with content, we believe the right words can make all the difference.
            </p>
            <div className="mt-12 flex justify-center gap-4">
              <Button>Join Our Mission</Button>
              <Button variant="secondary">Learn More</Button>
            </div>
          </div>
        </section>
        <section className="py-24 md:py-32 bg-card/50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative h-[500px]">
                <Image alt="Team brainstorming session" width={600} height={400} className="absolute top-0 left-0 w-2/3 h-2/3 rounded-3xl shadow-2xl object-cover transform hover:scale-105 transition-transform duration-300 z-10" src="https://placehold.co/600x400.png" data-ai-hint="team brainstorming" />
                <Image alt="Team working on laptops" width={600} height={400} className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-3xl shadow-2xl object-cover transform hover:scale-105 transition-transform duration-300" src="https://placehold.co/600x400.png" data-ai-hint="team working" />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">Our Mission: <br /> Empowering Authentic Creation</h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                  At CaptionCraft, our core mission is to empower creators of all kinds with intuitive, powerful tools to craft compelling narratives effortlessly. We're dedicated to pushing the boundaries of AI to deliver captions that aren't just accurate, but also resonate with personality and purpose.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-16 tracking-tight">Meet the Visionaries</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="group text-center">
                <Image alt="Sarah Chen" width={160} height={160} className="w-40 h-40 rounded-full mb-6 object-cover shadow-lg mx-auto border-4 border-transparent group-hover:border-primary transition-all duration-300" src="https://placehold.co/160x160.png" data-ai-hint="woman portrait" />
                <h3 className="text-2xl font-bold text-foreground">Sarah Chen</h3>
                <p className="text-md text-accent font-semibold">CEO &amp; Founder</p>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">The visionary leader dedicated to fusing creativity with technology.</p>
              </div>
              <div className="group text-center">
                <Image alt="David Lee" width={160} height={160} className="w-40 h-40 rounded-full mb-6 object-cover shadow-lg mx-auto border-4 border-transparent group-hover:border-primary transition-all duration-300" src="https://placehold.co/160x160.png" data-ai-hint="man portrait" />
                <h3 className="text-2xl font-bold text-foreground">David Lee</h3>
                <p className="text-md text-accent font-semibold">Head of Technology</p>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">The engineering mastermind building the future of our platform.</p>
              </div>
              <div className="group text-center">
                <Image alt="Emily Wong" width={160} height={160} className="w-40 h-40 rounded-full mb-6 object-cover shadow-lg mx-auto border-4 border-transparent group-hover:border-primary transition-all duration-300" src="https://placehold.co/160x160.png" data-ai-hint="woman portrait" />
                <h3 className="text-2xl font-bold text-foreground">Emily Wong</h3>
                <p className="text-md text-accent font-semibold">Lead Designer</p>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">The creative soul shaping our seamless and beautiful user experience.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-black/20 border-t">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col">
              <Link className="flex items-center gap-3 mb-4" href="/">
                <div className="bg-gradient-to-br from-primary to-secondary p-2.5 rounded-xl">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">CaptionCraft</h1>
              </Link>
              <p className="text-muted-foreground text-sm max-w-xs">AI-powered caption generation to supercharge your social media presence.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-2">
              <div>
                <h4 className="font-semibold text-foreground mb-4">Product</h4>
                <ul className="space-y-3">
                  <li><Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="/features">Features</Link></li>
                  <li><Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">Pricing</Link></li>
                  <li><Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">Updates</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Company</h4>
                <ul className="space-y-3">
                  <li><Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="/about">About Us</Link></li>
                  <li><Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">Careers</Link></li>
                  <li><Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="/contact">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                <ul className="space-y-3">
                  <li><Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">Terms of Service</Link></li>
                  <li><Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">© 2024 CaptionCraft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
