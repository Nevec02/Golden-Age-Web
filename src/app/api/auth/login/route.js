import { NextResponse } from "next/server";
import { getUserFromDBtesting, getUserFromDb, getUsers } from "@/libs/data";
export async function POST(request) {
    const { email, password } = await request.json();
    const user = await getUserFromDBtesting(email, password);
    if (user) {
        return NextResponse.json({ user }, { status: 200 });
    } else {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
}


export async function GET() {
 const users = await getUsers();
  return NextResponse.json({ users }, { status: 200 });
}