'use client';
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { status } = useSession({ required: true });
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);

  const [current, setCurrent] = useState('');
  const [newPw, setNewPw] = useState('');
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/user');
        if (res.ok) {
          const data = await res.json();
          setUsername(data.data.username || '');
          setEmail(data.data.email || '');
        }
      } catch (e) {
        console.error('Failed to load user', e);
      }
    };
    if (status === 'authenticated') load();
  }, [status]);

  if (status === 'loading') return null;

  return (
    <div className="flex size-full min-h-screen flex-col bg-background">
      <main className="w-full flex-1 bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl">Manage your account settings, notification preferences, and application configurations.</p>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <nav className="space-y-1">
                <a className="block rounded-md px-3 py-2 text-sm font-medium text-foreground bg-card" href="#account">Account</a>
                <a className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground" href="#notifications">Notifications</a>
                <a className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground" href="#integrations">Integrations</a>
                <a className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-card hover:text-foreground" href="#app-settings">App Settings</a>
              </nav>
            </div>
            <div className="lg:col-span-2">
              <div className="space-y-12">
                <section className="space-y-6 rounded-xl bg-card p-8" id="account">
                  <h2 className="text-xl font-semibold text-foreground tracking-tight">Account Information</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-3">
                      <label className="text-sm text-foreground" htmlFor="username">Username</label>
                      <div className="sm:col-span-2">
                        <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-3">
                      <label className="text-sm text-foreground" htmlFor="email">Email</label>
                      <div className="sm:col-span-2">
                        <Input id="email" type="email" value={email} disabled />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-3">
                      <label className="text-sm text-foreground" htmlFor="password">Password</label>
                      <div className="sm:col-span-2">
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 gap-2">
                            <Input id="currentPassword" type="password" placeholder="Current password" value={current} onChange={(e) => setCurrent(e.target.value)} />
                            <Input id="newPassword" type="password" placeholder="New password" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
                          </div>
                          <Button variant="secondary" className="w-full sm:w-auto" disabled={changing} onClick={async () => {
                            setChanging(true);
                            try {
                              const res = await fetch('/api/auth/change-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ currentPassword: current, newPassword: newPw }) });
                              if (!res.ok) {
                                const j = await res.json().catch(() => ({}));
                                toast({ title: 'Change password failed', description: j.message || 'Please check your current password and try again.', variant: 'destructive' as any });
                              } else {
                                toast({ title: 'Password changed' });
                              }
                            } finally {
                              setChanging(false);
                              setCurrent('');
                              setNewPw('');
                            }
                          }}>Change Password</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="space-y-6 rounded-xl bg-card p-8" id="notifications">
                  <h2 className="text-xl font-semibold text-foreground tracking-tight">Notifications</h2>
                  <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                    <div>
                      <p className="font-medium text-foreground">App Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive notifications about new features and updates.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </section>
                <section className="space-y-6 rounded-xl bg-card p-8" id="integrations">
                  <h2 className="text-xl font-semibold text-foreground tracking-tight">Integrations</h2>
                  <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                    <div>
                      <p className="font-medium text-foreground">Connect Social Media</p>
                      <p className="text-sm text-muted-foreground">Connect social accounts for seamless caption sharing.</p>
                    </div>
                    <Button variant="secondary">Connect</Button>
                  </div>
                </section>
              </div>
              <div className="mt-12 flex justify-end">
                <Button disabled={saving} onClick={async () => {
                  setSaving(true);
                  try {
                    const res = await fetch('/api/user', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username }) });
                    if (!res.ok) {
                      const j = await res.json().catch(() => ({}));
                      toast({ title: 'Save failed', description: j.message || 'Unable to update your profile.', variant: 'destructive' as any });
                    } else {
                      toast({ title: 'Changes saved' });
                    }
                  } finally {
                    setSaving(false);
                  }
                }}>Save All Changes</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
