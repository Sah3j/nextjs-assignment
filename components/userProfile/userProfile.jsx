import styles from './userProfile.module.css'
import { auth } from "@/authentication/auth"
import Image from 'next/image'

const UserProfile = async () => {

  const user = await auth()
  const imageUrl = user.user.image || 'https://i.stack.imgur.com/l60Hf.png';

  return (
    <div className={styles.profile}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          fill
          alt="user profile avatar"
        />
      </div>
      <h4>Hello, {user.user.name}</h4>
    </div>
  )
}

export default UserProfile