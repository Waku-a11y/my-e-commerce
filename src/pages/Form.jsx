import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../Firebase/firebase'
import { useNavigate, useParams } from 'react-router'
import useFirestore from '../hooks/useFirestore'

export default function Create() {

let { isDark } =  useContext(ThemeContext)
let navigate = useNavigate()

let [ name, setName ] = useState('')
let [ size, setSize ] = useState('')
let [ price, setPrice ] = useState('')
let [ type, setType ] = useState('')

let { id } = useParams()

let { getDocument, updateDocument } = useFirestore()
const { data: product } = id ? getDocument('products', id) : { data: [] }

useEffect(() => {
    if (product) {
    setName(product.name || name )
    setSize(product.size || size)
    setPrice(product.price || price)
    setType(product.type || type)
}
},[product])

const postHandler = async(e) => {
    e.preventDefault()
    if (id) {
    let editedProduct = {
    name ,
    size ,
    price ,
    type ,
    date : serverTimestamp()
}
    await updateDocument('products', product?.id, editedProduct)
    navigate('/products/all')
}
    else {
    let newProduct = {
    name,
    size,
    price,
    type,
    date : serverTimestamp()
}
    let ref = collection(db, 'products')
    await addDoc(ref, newProduct)
    navigate('/products/all')
}
}

  return (
    <div className='flex justify-center items-center p-5 md:max-w-120 max-w-100 mx-auto'>
        
        <form  class="w-full max-w-ms">

            {/* product name */}
            <div class="md:flex md:items-center mb-6">

                <div class="md:w-1/3">
                <label class={`block font-bold md:text-right mb-1 md:mb-0 pr-4 ${isDark ? 'text-white' : 'text-gray-500'}`} for="inline-full-name">
                    Product Name
                </label>
                </div>
                <div class="md:w-2/3">
                <input onChange={(e) => setName(e.target.value)} value={name} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-brand" id="inline-full-name" type="text" />
                </div>

            </div>

            {/* product size */}
            <div class="md:flex md:items-center mb-6">

                <div class="md:w-1/3">
                <label class={`block font-bold md:text-right mb-1 md:mb-0 pr-4 ${isDark ? 'text-white' : 'text-gray-500'}`} for="inline-full-name">
                    Size
                </label>
                </div>
                <div class="md:w-2/3">
                <input onChange={(e) => setSize(e.target.value)} value={size} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-brand" id="inline-full-name" type="text" placeholder='XL, Medium'/>
                </div>

            </div>

            {/* product price */}
            <div class="md:flex md:items-center mb-6">

                <div class="md:w-1/3">
                <label class={`block font-bold md:text-right mb-1 md:mb-0 pr-4 ${isDark ? 'text-white' : 'text-gray-500'}`} for="inline-full-name">
                    Price
                </label>
                </div>
                <div class="md:w-2/3">
                <input onChange={(e) => setPrice(e.target.value)} value={price} class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-brand" id="inline-full-name" type="text" placeholder='in MMK'/>
                </div>

            </div>

            {/* product type */}


            <div className="md:w-50 md:ml-23 mb-5 flex items-center">
                <label class={`block font-bold md:text-right mb-1 md:mb-0 pr-4 ${isDark ? 'text-white' : 'text-gray-500'}`} for="inline-full-name">
                    Type
                </label>
                <select onChange={(e) => setType(e.target.value)} value={type} className="p-3 w-full bg-white border cursor-pointer border-gray-300 rounded-lg shadow-md px-4 py-2 text-gray-700 hover:outline-none hover:ring-2 focus:ring-purple-500 transition">
                    <option className='text-brand font-bold'>Select Type</option>
                    <option value="jacket" className='text-brand font-bold'>Jacket</option>
                    <option value="sneaker" className='text-brand font-bold'>Sneaker</option>
                    <option value="backpack" className='text-brand font-bold'>Backpack</option>
                    <option value="hat" className='text-brand font-bold'>Hat</option>
                    <option value="shorts" className='text-brand font-bold'>Shorts</option>
                </select>
            </div>

            <button onClick={postHandler} type='button' className="md:ml-60 ml-40 mt-4 cursor-pointer bg-transparent hover:bg-purple-900 text-brand font-semibold hover:text-white py-1 px-4 ring ring-1.5 ring-brand hover:border-transparent rounded">
            {`${id ? 'Update' : 'Post'}`}
            </button>

        </form>
    </div>
  )
}
