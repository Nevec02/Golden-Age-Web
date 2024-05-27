import { NextResponse } from 'next/server';
import { getUsers } from '@/libs/data';
export async function GET() {
    const users = await getUsers();
    return NextResponse.json({ users }, { status: 200 });
  }