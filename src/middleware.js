import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import cookie from 'cookie';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {

  const cookieHeader = request.headers.get('cookie');

  if (!cookieHeader) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const cookies = cookie.parse(cookieHeader);
  const token = cookies.jwt;

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      if (request.nextUrl.pathname.startsWith('/dashboard/admin') && payload.role !== 1) { 
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/dashboard/admin/:path*'],
};