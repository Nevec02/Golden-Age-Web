import { NextResponse } from "next/server";
import { getServices, postService } from "@/libs/data";
import { conn } from "@/libs/mysql";
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Asynchronously handles a POST request.
 *
 * @param {Object} request - The request object.
 * @return {Promise<Object>} The JSON response object.
 */
export async function POST(request) {
  try {
    const { name, description, price } = await request.json();
    const result = await postService(name, description, price);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT() {}

export async function PATCH() {}

export async function DELETE() {}
