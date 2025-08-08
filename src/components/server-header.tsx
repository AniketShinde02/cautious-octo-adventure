import Link from 'next/link';
import { Sparkles, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { SignUpButton } from '@/components/SignUpButton';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ServerHeader() {
  const session = await getServerSession(authOptions);
  const isAuthed = Boolean(session);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">CaptionCraft</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="#features">Features</Link>
            <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/about">About</Link>
            <Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" href="/contact">Contact</Link>
          </nav>
          <div className="hidden md:flex items-center gap-2">
            {isAuthed ? (
              <Button asChild>
                <Link href="/profile">Dashboard</Link>
              </Button>
            ) : (
              <SignUpButton />
            )}
            <ThemeToggle />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background">
              <nav className="flex flex-col gap-6 mt-8">
                <Link className="text-lg font-medium text-muted-foreground hover:text-foreground" href="/#features">Features</Link>
                <Link className="text-lg font-medium text-muted-foreground hover:text-foreground" href="/about">About</Link>
                <Link className="text-lg font-medium text-muted-foreground hover:text-foreground" href="/contact">Contact</Link>
                <div className="border-t pt-6 mt-2 space-y-4">
                  {isAuthed ? (
                    <Button asChild className="w-full">
                      <Link href="/profile">Dashboard</Link>
                    </Button>
                  ) : (
                    <SignUpButton className="w-full" />
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
