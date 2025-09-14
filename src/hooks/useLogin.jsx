import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../Firebase/firebase'

export default function useLogin() {

    const [error, setError] = useState(null)
    const [ loading, setLoading]  = useState(false)
    const login = async(email, password) => {
        try {
            setLoading(true)
            let response = await signInWithEmailAndPassword(auth, email, password)
            setLoading(false)
            return response.user
            } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

  return { error, loading, login}
}
