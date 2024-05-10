import { Event } from "@/database/models";
import { connectToDb } from "@/database/utils";
import { NextResponse } from "next/server";

export const DELETE = async (request) => {
  try {
    await connectToDb();
    const eventId = request.nextUrl.searchParams.get('eventId');
    console.log("EventId here", eventId)
    const result = await Event.findByIdAndDelete(eventId);

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch events!", {
      status: 500,
      statusText: "Internal Server Error"
    });
  }
}