import { Event } from "@/database/models";
import { connectToDb } from "@/database/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectToDb();
    const userId = request.nextUrl.searchParams.get('userId');
    
    if (!userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 400, // Bad request
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    console.log("User ID here is:", userId);

    // Fetch all events where userId is in the attendees array
    const events = await Event.find({
      attendees: userId
    });

    // Respond with the found events
    return new Response(JSON.stringify(events), {
      status: 200, // OK
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.log("Error fetching attending events:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch attending events" }), {
      status: 500, // Internal Server Error
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
