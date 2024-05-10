import { Event } from "@/database/models";
import { connectToDb } from "@/database/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectToDb();
    const userId = request.nextUrl.searchParams.get('userId');
    const events = await Event.find({ userId: userId });

    return NextResponse.json(events);
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch events!", {
      status: 500,
      statusText: "Internal Server Error"
    });
  }
}