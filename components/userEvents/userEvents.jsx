import styles from './userEvents.module.css'
import { auth } from '@/authentication/auth';
import { reFetchUserEvents } from '@/lib/action';

const fetchUserEvents = async (userId) => {
  const res = await fetch(`http://localhost:3000/api/getUserEvents?userId=${userId}`, { next: { tags: ['userEvents'] } });
  if(!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`)
  }
  return await res.json();
}

const deleteEvent = async (formData) => {
  "use server"
  const eventId = formData.get('eventId')
  const res = await fetch(`http://localhost:3000/api/deleteEvent?eventId=${eventId}`, {
    method: 'DELETE'
  })

  if (!res.ok) {
    throw new Error(`Failed to delete event: ${res.status}`);
  }

  await reFetchUserEvents();
  return await res.json();
}

const UserEvents = async () => {

  const user = await auth();
  const userId = user.user.id;
  const userEvents = await fetchUserEvents(userId);

  return (
    <div className={styles.container}>
      <h3>Your Events</h3>
      <div className={styles.message}>
        {userEvents.length === 0 && <p>You have not created any events. <br/> Naviagte to home and create an event.</p>}
      </div>
      {userEvents.map((event) => (
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
          <form action={deleteEvent}>
            <input type="hidden" name="eventId" value={event._id} />
            <button className={styles.delete}>Delete Event</button>
          </form>
        </div>
      ))}
    </div>
  )
}

export default UserEvents