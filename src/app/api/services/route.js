import { NextResponse } from "next/server";
import { getServices } from "@/libs/data";
/**
 * Retrieves services from the database and returns them as a JSON response.
 *
 * @return {Promise<NextResponse>} A Promise that resolves to a NextResponse object containing the services data.
 */
export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json(services);
  } catch (error) {
    console.log(error);
  }
}

export async function POST() {}

export async function PUT() {}

export async function DELETE() {}
