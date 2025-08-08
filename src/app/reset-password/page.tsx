"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';

export default function ResetPasswordPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const token = useMemo(() => sp.get('token') || '', [sp]);
  const email = useMemo(() => sp.get('email') || '', [sp]);

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
  const disabled = submitting || !token || !email || !strong.test(password) || password !== confirm;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <Card className="bg-card border border-border/50 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary"><Lock className="w-5 h-5" /></div>
              <h1 className="text-xl font-semibold">Reset your password</h1>
            </div>
            <p className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {email || 'No email provided'}
            </p>

            {!token || !email ? (
              <p className="text-sm text-destructive">Invalid or missing reset link. Please request a new password reset.</p>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      type={show ? 'text' : 'password'}
                      placeholder="New password (min 8 chars, upper/lower/number/special)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 text-muted-foreground"
                      onClick={() => setShow((s) => !s)}
                      aria-label={show ? 'Hide password' : 'Show password'}
                    >
                      {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {/* Strength meter */}
                  <div className="h-2 w-full rounded bg-muted overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        password.length === 0
                          ? 'w-0'
                          : strong.test(password)
                          ? 'w-full bg-green-500'
                          : password.length >= 6
                          ? 'w-1/2 bg-yellow-500'
                          : 'w-1/4 bg-red-500'
                      }`}
                    />
                  </div>
                  <div className="relative">
                    <Input
                      type={show2 ? 'text' : 'password'}
                      placeholder="Confirm new password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 text-muted-foreground"
                      onClick={() => setShow2((s) => !s)}
                      aria-label={show2 ? 'Hide password' : 'Show password'}
                    >
                      {show2 ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button
                  className="w-full mt-5"
                  disabled={disabled}
                  onClick={async () => {
                    if (password !== confirm) {
                      toast({ variant: 'destructive', title: 'Passwords do not match' });
                      return;
                    }
                    if (password.length < 6) {
                      toast({ variant: 'destructive', title: 'Password too short', description: 'Minimum 6 characters.' });
                      return;
                    }
                    setSubmitting(true);
                    try {
                      const res = await fetch('/api/auth/reset-password', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, token, newPassword: password }),
                      });
                      if (!res.ok) {
                        const d = await res.json().catch(() => ({}));
                        toast({ variant: 'destructive', title: 'Reset failed', description: d.message || 'Please request a new link and try again.' });
                        return;
                      }
                      toast({ title: 'Password reset', description: 'You can now sign in with your new password.' });
                      setTimeout(() => router.push('/'), 800);
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Reset Password'}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
