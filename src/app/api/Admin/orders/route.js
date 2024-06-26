import { NextResponse } from "next/server";
import { getOrders } from "@/libs/data";

export async function GET() {
    try {
        const allOrders = await getOrders();
        return NextResponse.json({ allOrders }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error.message, message: "Orders GET error" },
            { status: 500 }
        );
    }
}

