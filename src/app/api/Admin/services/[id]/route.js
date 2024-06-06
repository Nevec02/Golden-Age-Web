import { NextResponse } from "next/server";
import { getService, updateService, deleteService } from "@/libs/data";

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

export async function PATCH(request, { params }) {
  try {
    const data = await request.json();
    const service = await getService(params.id);

    if (!service) {
      return NextResponse.json(
        { error: "Service not found", message: "Service not found" },
        { status: 404 }
      );
    }

    const updatedService = { ...service, ...data };
    
    await updateService(updatedService, params.id);

    return NextResponse.json(
      { message: "Service updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Service PATCH error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const service = await getService(params.id);
    if (!service) {
      return NextResponse.json(
        { error: "Service not found", message: "Service not found" },
        { status: 404 }
      );
    } else {
      await deleteService(params.id);
      return NextResponse.json(
        { message: "Service deleted successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Service DELETE error" },
      { status: 500 }
    );
  }
}
