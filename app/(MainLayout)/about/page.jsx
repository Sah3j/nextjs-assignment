import React from 'react'
import styles from './about.module.css'

const AboutPage = () => {
  return (
    <div>
      <h2>About event-planner</h2>
      <p className={styles.aboutText}>
        {`Welcome to event-planner, your dedicated platform for discovering and creating community events! Whether you're looking to attend local happenings or organize your own, our app simplifies the process, ensuring a seamless and engaging experience for all users. Connect with your community, explore new interests, and create memorable experiences with us today!`}
      </p>
    </div>
  )
}

export default AboutPage