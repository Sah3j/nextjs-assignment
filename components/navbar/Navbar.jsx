import Link from "next/link"
import Links from "./Links"
import styles  from './navbar.module.css'
import { auth } from "@/authentication/auth";

const Navbar = async () => {

  const session = await auth();

  return (
    <div className={styles.navbar}>
      <Link href="/" className={styles.logo}>event-planner</Link>
      <div>
        <Links session={session}/>
      </div>
    </div>
  )
}

export default Navbar