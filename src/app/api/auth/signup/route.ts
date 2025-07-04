import { NextResponse } from 'next/server';
import { prisma } from '@/lib/Prisma';
import { hash } from 'bcrypt';
export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  // Hash password
  const hashedPassword = await hash(password, 10);

  // Create user
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
}
