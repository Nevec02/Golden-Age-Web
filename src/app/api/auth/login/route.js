import { NextResponse } from 'next/server';
import { getUserFromDb, getUsers } from '@/libs/data';
import { generateJWT } from '@/libs/auth';

export async function POST(request) {
  const { email, password } = await request.json();
  const user = await getUserFromDb(email, password);

  if (user) {
    const jwtCookie = await generateJWT(user);
    const response = NextResponse.json({ message: 'User logged in successfully' }, { status: 200 });
    response.headers.set('Set-Cookie', jwtCookie);
    return response;
  } else {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}

export async function GET() {
  const users = await getUsers();
  return NextResponse.json({ users }, { status: 200 });
}