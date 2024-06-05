import { SignJWT } from 'jose';
import cookie from 'cookie';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generateJWT(user) {
  const payload = {
    id: user.id,
    role: user.rol,
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(JWT_SECRET);

  const serializedCookie = cookie.serialize('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 3600,
    sameSite: 'strict',
    path: '/', 
  });

  return serializedCookie;
}