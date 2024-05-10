'use client'

import styles from './eventForm.module.css'
import { useFormState, useFormStatus } from "react-dom"
import { reFetchUserEvents } from '@/lib/action';
import { useRef } from 'react';

export async function FormSubmit (prevState, formData) {
  const res = await fetch('http://localhost:3000/api/addEvent', {
    method: 'POST',
    body: formData
  })

  const data = await res.json()
  await reFetchUserEvents()
  return data
}

const EventForm = () => {

  const [state, formAction] = useFormState(FormSubmit, '')
  const { pending } = useFormStatus()
  const ref = useRef()

  return (
    <form className={styles.form} ref={ref} action={(formData) => {
      formAction(formData)
      ref.current.reset()
    }}>
      <div>
        {state.message}
      </div>
      <input type="text" placeholder="Event Title" name="title" required/>
      <input type="date" name="date" required/>
      <input type="text" placeholder="Event Details" name="desc" required/>
      <button aria-disabled={pending} type="submit">Post Event</button>
    </form>
  )
}

export default EventForm