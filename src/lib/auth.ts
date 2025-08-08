
import type {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

import crypto from 'crypto';

const derivedSecret = process.env.NODE_ENV === 'development'
  ? `${process.env.NEXTAUTH_SECRET}-${process.pid}`
  : process.env.NEXTAUTH_SECRET;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials.password) {
          throw new Error('Missing email or password.');
        }

        const user = await User.findOne({ email: credentials.email }).select('+password');

        if (!user) {
          // Security best practice: use a generic error message
          // to prevent user enumeration attacks.
          throw new Error('Invalid credentials.');
        }
        
        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) {
          throw new Error('Invalid credentials.');
        }
        
        // Return a plain, serializable object. This is the critical fix.
        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,   // refresh JWT claims at most once per 24h
  },
  secret: derivedSecret,
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // Ensure the session user object has the id
        session.user.id = token.id as string;
        
        // You can also fetch additional user data here if needed
        await dbConnect();
        const userFromDb = await User.findById(token.id);
        if (userFromDb) {
            // @ts-ignore
            session.user.createdAt = userFromDb.createdAt;
        }
      }
      return session;
    },
  },
};
