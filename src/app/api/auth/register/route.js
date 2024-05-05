import { postUser } from "@/libs/data";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { name, email, password } = await request.json();
    const user = await postUser(name, email, password);
    if (user) {
        return NextResponse.json({ user }, { status: 200 });
    } else {
        return NextResponse.json({ error: "User not created" }, { status: 404 });
    }
}