
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide email and password' },
        { status: 400 }
      );
    }

    // Enforce strong password rules
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    if (!strong.test(password)) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.' },
        { status: 400 }
      );
    }
    
    const userExists = await User.findOne({ email });

    if (userExists) {
        return NextResponse.json(
            { success: false, message: 'User already exists' },
            { status: 409 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      passwordHistory: [],
    });
    
    return NextResponse.json({ success: true, data: { email: user.email } }, { status: 201 });
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json({ success: false, message: error.message || 'An unexpected error occurred.' }, { status: 500 });
  }
}
