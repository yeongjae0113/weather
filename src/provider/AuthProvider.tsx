import { ReactNode, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { auth } from "../config/firebase"
import { User } from "firebase/auth"

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState
  <{user: User | null, accessToken?: string}>({user: null, accessToken: undefined})

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (a) => {
      if (a) {
        const token = await a.getIdToken()
        setUser({user: a, accessToken: token})
      } else {
        setUser({user: null, accessToken: undefined})
      }
      console.log(a)
    })

    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export default AuthProvider