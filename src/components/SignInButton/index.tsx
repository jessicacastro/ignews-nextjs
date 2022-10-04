import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'

import styles from './styles.module.scss'

interface LoggedButtonProps {
  user: {
    name?: string
    email?: string
    image?: string
  }
}

const LoggedButton = ({ user }: LoggedButtonProps) => (
  <button type="button" className={styles.signInButton} onClick={() => signOut()}>
    <FaGithub color="#04d361" />
    {user?.name}
    <FiX color="#737380" className={styles.closeIcon} />
  </button>
)

const NotLoggedButton = () => (
  <button type="button" className={styles.signInButton} onClick={() => signIn('github')}>
    <FaGithub color="#eba417" />
    Sign in with Github
  </button>
)


export const SignInButton = () => {
  const { data: session } = useSession() // useSession() returns an object with the user's session data

  return (
    session ? (
      <LoggedButton user={session.user}/>
    ) : (
      <NotLoggedButton />
    )
  )
}
