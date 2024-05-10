import LoginForm from "@/components/loginForm/loginForm";
import { handleGoogleLogin, login } from "@/lib/action";
import styles from './login.module.css'

export default async function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleGoogleLogin}>
          <button>Login with Google</button>
        </form>
        <LoginForm/>
      </div>
    </div>
  );
}
