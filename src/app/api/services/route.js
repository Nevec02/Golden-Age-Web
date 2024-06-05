import { NextResponse } from "next/server";
import { getServices } from "@/libs/data";

// TODO: Add error handling and check wrong data type

/**
 * Retrieves services from the database and returns them as a JSON response.
 *
 * @return {Promise<NextResponse>} A Promise that resolves to a NextResponse object containing the services data.
 */
export async function GET() {
  try {
    const services = await getServices();
    if (services) {
      return NextResponse.json(services);
    } else {
      return NextResponse.json({ error: "No services found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Services GET error" },
      { status: 500 }
    );
  }
}


