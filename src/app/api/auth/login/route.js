import { NextResponse } from "next/server";
import { getUserFromDb, getUsers } from "@/libs/data";
export async function POST(request) {
    const { email, password } = await request.json();
    const user = await getUserFromDb(email, password);
    if (user) {
        return NextResponse.json({ message: "User logged in successfully" }, { status: 200 });
    } else {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
}


export async function GET() {
 const users = await getUsers();
  return NextResponse.json({ users }, { status: 200 });
}