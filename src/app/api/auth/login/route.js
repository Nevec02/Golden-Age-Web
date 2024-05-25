import { NextResponse } from 'next/server';
import { getUserFromDb } from '@/libs/data';
import { generateJWT } from '@/libs/auth';

export async function POST(request) {
  const { email, password } = await request.json();
  const user = await getUserFromDb(email, password);

  if (user) {
    const jwtCookie = await generateJWT(user);
    const response = NextResponse.json({ 
      message: 'User logged in successfully',
      role: user.rol  // Include the role in the response
    }, { status: 200 });
    response.headers.set('Set-Cookie', jwtCookie);
    console.log('Set-Cookie:', jwtCookie); // Debug line to ensure cookie is set
    console.log('rol:', user.rol)
    return response;
  } else {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}


export async function GET() {
  const users = await getUsers();
  return NextResponse.json({ users }, { status: 200 });
}