import { NextResponse } from "next/server";
import { getService } from "@/libs/data";

export async function GET(request, { params }) {
  try {
    const service = await getService(params.id);
    return NextResponse.json(service);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request) {}

export async function PUT() {}

export async function PATCH() {}

export async function DELETE() {}

