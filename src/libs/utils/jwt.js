// utils/jwt.js
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getUserFromToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return { userId: payload.id, role: payload.role };
  } catch (error) {
    throw new Error('Invalid token');
  }
}
