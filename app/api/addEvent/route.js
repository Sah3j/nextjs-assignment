import { connectToDb } from "@/database/utils"
import { Event } from "@/database/models"
import { auth } from "@/authentication/auth"

export async function POST(req) {
  let res = {message: 'Invalid Request.'}
  const data = await req.formData()
  const eventTitle = data.get('title')
  const eventDate = data.get('date')
  const eventDescription = data.get('desc')

  //save to database
  try {
    await connectToDb()
    const user = await auth()
    const newEvent = new Event({
      title: eventTitle,
      desc: eventDescription,
      date: eventDate,
      userId: user.user.id
    });

    await newEvent.save();
  } catch (error) {
    console.log(error)
  }

  if(!eventTitle || !eventDate || !eventDescription) {
    res = {message: 'Please fill out all required fields.'}
  } else {
    res = {message: 'Posted successfully. Naviagte to dashboard to view your events'}
  }

  return Response.json(res)
}