// pages/api/orders.js
import { NextResponse } from 'next/server';
import { getOrdersByUserId, getOrderDetails, createOrder } from '@/libs/data';
import { getUserFromToken } from '@/libs/utils/jwt';
import cookie from 'cookie';

export async function GET(request) {
  const cookieHeader = request.headers.get('cookie');
  
  if (!cookieHeader) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  const cookies = cookie.parse(cookieHeader);
  const token = cookies.jwt;

  if (!token) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  try {
    const { userId } = await getUserFromToken(token);

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
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

export async function POST(request) {
  const cookieHeader = request.headers.get('cookie');
  
  if (!cookieHeader) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  const cookies = cookie.parse(cookieHeader);
  const token = cookies.jwt;

  if (!token) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  try {
    const { userId, role } = await getUserFromToken(token);

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const data = await request.json();
    if (!data.details || !Array.isArray(data.details)) {
      return NextResponse.json({ error: "Order details must be provided and must be an array" }, { status: 400 });
    }
    data.user_id = userId; // Add user ID to the order data

    const order = await createOrder(data);
    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Order POST error" },
      { status: 500 }
    );
  }
}

