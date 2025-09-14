import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { db } from '../Firebase/firebase'
import React, { useEffect, useRef, useState } from 'react'

export default function useFirestore() {

    const getCollection = (colName, _q, search) => {

    let [ data, setData ] = useState([])
    let [ error, setError ] = useState(null)
    let [ loading, setLoading ] = useState(false)
    let qRef = useRef(_q).current
 
    useEffect(() => {
        setLoading(true)
        let ref = collection( db, colName)
           let queries = []
            
        if (qRef && qRef[2] !== undefined) {
            queries.push(where(...qRef))
        }
        queries.push(orderBy('date', 'desc'))
        let q = query(ref, ...queries)
        onSnapshot(q, (docs) => {
        if(docs.empty) {
            setData([])
            setError('Cannot fetch...')
            setLoading(false)
        }
        else {
            let collectionData = [];
            (docs).forEach(doc => {
            collectionData.push({ id : doc.id , ...doc.data()})
        })
        if (search?.field && search?.value) {
            let searchedData = collectionData.filter(doc => {
                return doc[search?.field].includes(search?.value)
            })
            setData(searchedData)
        }
        else {
            setData(collectionData)
        }
        setLoading(false)
    }
    })
        },[qRef, search?.field, search?.value])
        return { loading, error, data }
    }

    const getDocument = (colName, id) => {

    let [ data, setData ] = useState([])
    let [ error, setError ] = useState(null)
    let [ loading, setLoading ] = useState(false)

        useEffect(() => {
        setLoading(true)
        let ref = doc (db, colName, id)
        onSnapshot(ref, (doc) => {
            if (doc.exists()) {
            let document = { id : doc.id, ...doc.data()}
            setData(document)
            setLoading(false)
            }
            else {
            setError('cannot fetch document')
            setLoading(false)
            }
        })
        },[id])

        return { loading, error, data}
}

    const updateDocument = (colName, id, data, updateTime) => {
        if (updateTime) {
            data.date = serverTimestamp()
        }
        let ref = doc ( db, colName, id)
        return updateDoc(ref, data)
    }

    const deleteDocument = (colName, id) => {
        let ref = doc ( db, colName, id)
        return deleteDoc(ref)
    }

    const addDocument = (colName, data, updateTime) => {
        if (updateTime) {
            data.date = serverTimestamp()
        }
        let ref = collection (db, colName)
        return addDoc(ref, data)
    }

  return { getCollection, updateDocument, getDocument, deleteDocument, addDocument }
}

