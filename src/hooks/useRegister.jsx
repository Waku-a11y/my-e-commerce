import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, {  useState } from 'react'
import { auth, db } from '../Firebase/firebase'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

export default function useRegister() {

    const [error, setError] = useState(null)
    const [ loading, setLoading]  = useState(false)

    const register = async(email, password, role) => {
        try {
            setLoading(true)
            let response = await createUserWithEmailAndPassword(auth, email, password)
            const user = response.user
            let ref = doc(db, 'roles', user.uid)
            await setDoc(ref, {
                email : user.email,
                role : role,
                userID : user.uid,
                date : serverTimestamp()
            })
            setLoading(false)
            return { user, role }
            } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

  return { error, loading, register}
}
