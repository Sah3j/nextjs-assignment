/*import { Event, User } from "./models";
import { connectToDb } from "./utils";
import { unstable_noStore as noStore } from "next/cache";


//fetching all events
export const getEvents = async () => {
  try {
    await connectToDb();
    const events = await Event.find();
    return events;
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch events!")
  }
}


//fetch a single event
export const getEvent = async (slug) => {
  try {
    connectToDb();
    const event = await Event.findOne({slug});
    return event;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch event!")
  }
}

export const getUser = async (id) => {
  noStore();
  try {
    connectToDb();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user!")
  }

}*/