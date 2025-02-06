import { compare } from 'bcrypt';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secure-jwt-secret'
);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Check email
    if (email !== process.env.ADMIN_EMAIL) {
      return new Response('Invalid credentials', { status: 401 });
    }

    // Compare password with hash
    const isValid = await compare(password, process.env.ADMIN_PASSWORD_HASH || '');
    
    if (!isValid) {
      return new Response('Invalid credentials', { status: 401 });
    }

    // Generate JWT token
    const token = await new SignJWT({ 
      email,
      role: 'SUPER_ADMIN'
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(JWT_SECRET);

    // Set HTTP-only cookie
    cookies().set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Auth error:', error);
    return new Response('Internal server error', { status: 500 });
  }
} 