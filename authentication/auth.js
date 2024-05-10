import { User } from "@/database/models";
import { connectToDb } from "@/database/utils";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config";

const login = async (credentials) => {
  try {
    connectToDb()
    const user = await User.findOne({ email: credentials.email })
    if(!user) {
      throw new Error("Email does not exist");
    }

    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
    if(!isPasswordCorrect) {
      throw new Error("Wrong credentials")
    }

    return user;
  } catch(error) {
    console.log(error)
    throw new Error("Failed to login!")
  }
}

export const { handlers:{GET,POST}, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials)
          return user

        } catch (error) {
          return null
        }
      }
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        connectToDb();
        try {
          const user = await User.findOne({ email: profile.email });

          if (!user) {
            const newUser = new User({
              name: profile.name,
              email: profile.email,
              img: profile.picture,
            });

            await newUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks
  },
});