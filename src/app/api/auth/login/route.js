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
      id: user.id,
      role: user.rol  
    }, { status: 200 });
    response.headers.set('Set-Cookie', jwtCookie);
    console.log('Set-Cookie:', jwtCookie);
    console.log('rol:', user.rol)
    console.log('id:', user.id)
    return response;
  } else {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}

