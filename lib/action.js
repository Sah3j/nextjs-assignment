"use server"

import {signIn, signOut} from "@/authentication/auth"
import { User } from "@/database/models"
import { connectToDb } from "@/database/utils"
import { revalidateTag } from 'next/cache'
import bcrypt from "bcryptjs";

export const handleGoogleLogin = async () => {
  "use server"
  await signIn('google')
}

export const reFetchEvents = async() => {
  revalidateTag('events')
}

export const reFetchUserEvents = async () => {
  revalidateTag('userEvents')
}


export const handleLogout = async () => {
  "use server"
  await signOut()
}

export const register = async (previousState, formData) => {
  const { name, email, password, passwordRepeat } = Object.fromEntries(formData);

  if (password != passwordRepeat) {
    return { error: "Password do not match!" }
  }

  try {
    connectToDb();
    const user = await User.findOne({ email })
    
    if (user) {
      return { error: "Email already exists" }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return { success: true }
  } catch (error) {
    console.log(error)
    return { error: "Could not regiter user" };
  }
}

export const login = async (previousState, formData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { email, password })

  } catch (error) {
    console.log(error);

    if (error.message.includes("CredentialsSignin")) {
      return { error: "Invalud username or password" }
    }
    throw error;
  }
}