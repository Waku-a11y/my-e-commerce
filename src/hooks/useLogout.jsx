import { signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../Firebase/firebase'

export default function useLogout() {

    let [ error, setError ] = useState('')
    let [ loading, setLoading ] = useState('')
    let logout = async() => {
      try {
        setLoading(true)
        let response = await signOut(auth)
        setLoading(false)
        return response.user
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

  return { error, loading, logout }
}
