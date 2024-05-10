import styles from "./home.module.css"
import { auth } from "@/authentication/auth"
import EventForm from '@/components/eventForm/eventForm'
import { Suspense } from "react"
import UserProfile from "@/components/userProfile/userProfile"

const HomePage = async () => {

  const user = await auth()

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <UserProfile/>
        <h1>Welcome to event-planner</h1>
        <h2>Your one stop shop to create and attend local events</h2>
        <p>Use the <span className={styles.form}>Form</span> on this page to create a new event.</p>
        <p>Naviagte to <span className={styles.dashboard}>Dashboard</span> to view:</p>
        <ul>
          <li>Your events</li>
          <li>Upcoming events</li>
          <li>Explore community events</li>
        </ul>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
          <h3>Add Event</h3>
          <Suspense fallback="...loading">
            <EventForm/>
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default HomePage