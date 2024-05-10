import { connectToDb } from "@/database/utils";
import { Event } from "@/database/models";

export async function PUT(req) {
  let res = {message: 'Invalid Request.'}
  const data = await req.formData()
  const userId = data.get('userId')
  const eventId = data.get('eventId')

  try {
    await connectToDb();

    const event = await Event.findByIdAndUpdate(
      eventId,
      {
        $addToSet: { attendees: userId } 
      },
      { new: true } 
    );

    if (!event) {
      throw new Error("Event not found");
    }

    res = {message: 'Updated successfully'}
  } catch (error) {
    console.log(error)
    res = {message: 'Could not be added to attendees list'}
  }

  return Response.json(res)
}
