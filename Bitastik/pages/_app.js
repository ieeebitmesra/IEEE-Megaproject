import { useState, useEffect } from 'react'
import '../styles/globals.css'
import '../components/notes/styles.css'
import '../components/confessions/ConfessionItem.css'
import '../components/confessions/Cheader.css'
import '../components/confessions/ConfessionList'
import Layout from '../components/layout/Layout'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, signInWithGoogle } from '../firebase/firebase'
import { useRouter } from 'next/router'
import Home from '.'
import Land from '../components/layout/Land'

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth)
  console.log(user)
  const router = useRouter()
  useEffect(() => {
    if (user) router.push('/dashboard')
  }, [user])
  
  return (
    <> {user ?
        <Layout>
          <Component {...pageProps} />
        </Layout> 
    :
      <Land>
        <div>
          <Home />
        </div>
        <button className='button' onClick={async () => {
          await signInWithGoogle();
        }}><span>Login</span></button>
      </Land>

    }
    </>

  )


}

export default MyApp



