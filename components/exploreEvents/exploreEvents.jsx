import styles from './exploreEvents.module.css'
import { auth } from '@/authentication/auth';
import { reFetchEvents } from '@/lib/action';

const fetchEvents = async () => {
  const res = await fetch('http://localhost:3000/api/getEvents');
  if(!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`)
  }
  return await res.json();
}

const attendEvent = async (formData) => {
  "use server"
  const res = await fetch('http://localhost:3000/api/updateEventAttendance', {
    method: 'PUT',
    body: formData,
  })

  if (!res.ok) {
    throw new Error(`Failed to update event attendance: ${res.status}`);
  }
  await reFetchEvents();
  return await res.json();
}

const ExploreEvents = async () => {

  const events = await fetchEvents();

  const user = await auth();
  const userId = user.user.id;

  return (
    <div className={styles.container}>
      <h3>Explore Events</h3>
      {events.map((event) => (
        <div className={styles.eventContainer} key={event._id}>
          <div className={styles.title}>
            {event.title}
          </div>
          <div className={styles.date}>
            Date: {event.date}
          </div>
          <div className={styles.description}>
            {event.desc}
          </div>
          {event.attendees.includes(userId) ? (
            <div className={styles.attending}>Already attending this event</div>
          ) : (
            <form action={attendEvent}>
              <input type="hidden" name="eventId" value={event._id} />
              <input type="hidden" name="userId" value={userId} />
              <button className={styles.attend}>Attend Event</button>
            </form>
          )}
        </div>
      ))}
    </div>
  )
}

export default ExploreEvents