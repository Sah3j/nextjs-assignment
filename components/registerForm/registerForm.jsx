'use client'

import Link from 'next/link'
import styles from './registerForm.module.css'
import { register } from "@/lib/action"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from "react-dom"

const RegisterForm = () => {

  const [state, formAction] = useFormState(register, undefined)
  
  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/")
  }, [state?.success, router])

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="Name (eg: John Doe)" name="name" />
      <input type="email" placeholder="Email (eg: ecample@example.com)" name="email" />
      <input type="password" placeholder="Password" name="password" />
      <input type="password" placeholder="Confirm Password" name="passwordRepeat" />
      <button>Register</button>
      {state?.error}
      <Link href="/">
        Have an account? <b>Login</b>
      </Link>
    </form>
  )
}

export default RegisterForm