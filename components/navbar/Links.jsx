"use client";

import { useState } from "react";
import styles from "./links.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react"

const Links = () => {
  const [open, setOpen] = useState(false);

  const pathName = usePathname();

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <div className={`${styles.link} ${pathName === '/home' && styles.active}`}>
          <Link href="/home">Home</Link>
        </div>
        <div className={`${styles.link} ${pathName === '/about' && styles.active}`}>
          <Link href="/about">About</Link>
        </div>
        <div className={`${styles.link} ${pathName === '/dashboard' && styles.active}`}>
          <Link href="/dashboard">Dashboard</Link>
        </div>
        <div>
          <button className={styles.logout} onClick={() => signOut()}>Logout</button>
        </div>
      </div>
      <button onClick={() => setOpen((prev) => !prev)} className={styles.menuButton}>Menu</button>
      {open && (
        <div className={styles.mobileLinks}>
          <div className={`${styles.link} ${pathName === '/home' && styles.active}`}>
            <Link href="/home">Home</Link>
          </div>
          <div className={`${styles.link} ${pathName === '/about' && styles.active}`}>
            <Link href="/about">About</Link>
          </div>
          <div className={`${styles.link} ${pathName === '/dashboard' && styles.active}`}>
            <Link href="/dashboard">Dashboard</Link>
          </div>
          <div>
            <div>
              <button className={styles.logout} onClick={() => signOut()}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Links