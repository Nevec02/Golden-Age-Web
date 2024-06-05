import { NextResponse } from "next/server";
import { getService } from "@/libs/data";

// TODO: Add error handling and check wrong data type
export async function GET(request, { params }) {
  try {
    const service = await getService(params.id);
    if (service) {
      return NextResponse.json(
        { message: "Service fetched successfully", data: service },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Service not found", message: "Service not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Service GET error" },
      { status: 500 }
    );
  }
}
