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

    const user = {
      id: payload.userId,
      role: payload.role,
    };
    
    // Role-based access control
    const url = request.nextUrl;

    if (url.pathname.startsWith('/admin-dashboard') && user.role !== 1) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (url.pathname.startsWith('/dashboard') && user.role === 1 && !url.pathname.startsWith('/admin-dashboard')) {
      return NextResponse.redirect(new URL('/admin-dashboard', request.url));
    }
    console.log('User role:', user.role);
    console.log('Requested URL:', url.pathname);
    return NextResponse.next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    return NextResponse.redirect(new URL('/', request.url));
  }
}


export const config = {
  matcher: ['/dashboard/:path*', '/admin-dashboard/:path*'],
};

