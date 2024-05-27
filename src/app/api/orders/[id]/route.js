import { NextResponse } from "next/server";
import { getOrdersByUserId, getOrderDetails } from "@/libs/data";
export async function GET(request, { params }) {
  try {
    const userId = params.id; // Get userId from URL parameters

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const orders = await getOrdersByUserId(userId);

    if (!orders.length) {
      return NextResponse.json({ error: "No orders found" }, { status: 404 });
    }

    for (const order of orders) {
      const details = await getOrderDetails(order.id);
      order.details = details;
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Orders GET error" },
      { status: 500 }
    );
  }
}
