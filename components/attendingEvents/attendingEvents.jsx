import styles from './attendingEvents.module.css'
import { auth } from '@/authentication/auth';

const attendingEvents = async (userId) => {
  const res = await fetch(`http://localhost:3000/api/attendingEvents?userId=${userId}`, { next: { tags: ['events'] } });
  if(!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`)
  }
  return await res.json();
}

const AttendingEvents = async () => {

  const user = await auth();
  const userId = user.user.id;
  const events = await attendingEvents(userId);

  return (
    <div className={styles.container}>
      <h3>Attending Events</h3>
      <div className={styles.message}>
        {events.length === 0 && <p>You are not attending any events. <br/> Explore events.</p>}
      </div>
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
        </div>
      ))}
    </div>
  )
}

export default AttendingEvents