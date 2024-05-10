import { Event } from "@/database/models";
import { connectToDb } from "@/database/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectToDb();
    const events = await Event.find();
    return NextResponse.json(events)
  } catch (error) {
    console.log(error)
    throw new Error("Failed ot fetch events!")
  }
}