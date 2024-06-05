import { NextResponse } from "next/server";
import { getServices, postService } from "@/libs/data";

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

/**
 * Asynchronously handles a POST request.
 *
 * @param {Object} request - The request object.
 * @return {Promise<Object>} The JSON response object.
 */
export async function POST(request) {
  try {
    const data = await request.json();
    const result = await postService(data);
    if (!result) {
      return NextResponse.json(
        { error: "Service not created", message: "Service not created" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { message: "Service created successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Services POST error" },
      { status: 500 }
    );
  }
}
