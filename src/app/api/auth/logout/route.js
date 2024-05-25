import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  response.headers.set('Set-Cookie', 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
  return response;
}