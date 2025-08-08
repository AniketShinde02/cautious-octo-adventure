
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { Loader2, LogIn, UserPlus, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useAuthModal } from "@/context/AuthModalContext";

const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { setOpen } = useAuthModal();
  const [activeTab, setActiveTab] = useState("sign-in");

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSignUp(values: z.infer<typeof signUpSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong during sign up");
      }
      
      toast({
        title: "Account Created! 🎉",
        description: "Your account has been created. Please sign in.",
      });
      setActiveTab("sign-in");
      signInForm.setValue("email", values.email);

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onSignIn(values: z.infer<typeof signInSchema>) {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        throw new Error("Invalid email or password. Please try again.");
      }
      
      setOpen(false);
      toast({
        title: "Signed In! 👋",
        description: "Welcome back! You're now logged in.",
      });
      router.push('/profile');
      router.refresh();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-muted">
        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="sign-in">
        <Card className="bg-transparent border-none shadow-none">
          <CardContent className="p-0 pt-6">
            <Form {...signInForm}>
              <form
                onSubmit={signInForm.handleSubmit(onSignIn)}
                className="space-y-4"
              >
                <FormField
                  control={signInForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="bg-background/80"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signInForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showSignInPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="bg-background/80 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignInPassword(!showSignInPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                          >
                            {showSignInPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="text-right">
                    <button
                      type="button"
                      className="text-sm text-muted-foreground hover:text-primary"
                      onClick={async () => {
                        const email = signInForm.getValues('email');
                        if (!email) {
                          toast({
                            variant: 'destructive',
                            title: 'Enter your email first',
                            description: 'Please enter your email above, then click Forgot Password.',
                          });
                          return;
                        }
                        try {
                          const res = await fetch('/api/auth/forgot-password', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email }),
                          });
                          if (res.ok) {
                            toast({
                              title: 'Reset link sent',
                              description: 'Check your email for the password reset link. In dev, see server logs for the preview URL.',
                            });
                          } else {
                            const d = await res.json().catch(() => ({}));
                            throw new Error(d.message || 'Failed to send reset link');
                          }
                        } catch (e: any) {
                          toast({
                            variant: 'destructive',
                            title: 'Forgot password failed',
                            description: e.message,
                          });
                        }
                      }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <LogIn className="mr-2" /> Sign In
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sign-up">
        <Card className="bg-transparent border-none shadow-none">
          <CardContent className="p-0 pt-6">
            <Form {...signUpForm}>
              <form
                onSubmit={signUpForm.handleSubmit(onSignUp)}
                className="space-y-4"
              >
                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                           className="bg-background/80"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showSignUpPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="bg-background/80 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                          >
                            {showSignUpPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                     <>
                      <UserPlus className="mr-2" /> Sign Up
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
