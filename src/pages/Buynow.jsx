import { serverTimestamp } from 'firebase/firestore'
import React, { useContext, useState } from 'react'

import { useNavigate, useParams } from 'react-router'
import useFirestore from '../hooks/useFirestore'
import { ThemeContext } from '../contexts/ThemeContext'

export default function Buynow() {

  let [ name, setName] = useState('')
  let [ phnum, setPhnum ] = useState('')
  let [ address, setAddress ] = useState('')
  let [ count, setCount ] = useState('')
  let [ email, setEmail ] = useState('')

  let navigate = useNavigate()

  let { id  } = useParams()
  let { getDocument, addDocument } = useFirestore()
  let { data : product } = getDocument('products', id)
  console.log(product)
  let { isDark } = useContext(ThemeContext)

  const orderHandler = async(e) => {
    e.preventDefault()
    let order = {
      name,
      email,
      phnum,
      address,
      productName : product?.name,
      count,
      date : serverTimestamp()
    }

    await addDocument ('orders', order, false)
    alert('Ordered successfully!!')
    navigate('/')
  }

  return (
    <div class="w-300 mx-auto mt-10 max-w-xs ">
      <form onSubmit={orderHandler} class={`shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 ${isDark ? 'bg-black ring-2 ring-brand ' : 'bg-white'}`}>
        <div class="mb-4">
          <label class={`block  text-sm font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`} for="name">
            Name
          </label>
          <input onChange={(e) => setName(e.target.value)} value={name} class={`shadow appearance-none border rounded-lg w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${isDark ? 'text-white ring ring-white' : 'text-gray-700'}`} id="name" name='name' type="text" placeholder="Username"/>
        </div>

        <div class="mb-4">
          <label class={`block  text-sm font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`} for="mail">
            Email
          </label>
          <input onChange={(e) => setEmail(e.target.value)} value={email} class={`shadow appearance-none border rounded-lg w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${isDark ? 'text-white ring ring-white' : 'text-gray-700'}`} id="mail" name='mail' type="mail" placeholder="example@gmail.com"/>
        </div>

        <div class="mb-4">
          <label class={`block  text-sm font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`} for="phone">
            Phone Number
          </label>
          <input onChange={(e) => setPhnum(e.target.value)} value={phnum} class={`shadow appearance-none border rounded-lg w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${isDark ? 'text-white ring ring-white' : 'text-gray-700'}`} id="phone" name='phone' type="tel" placeholder="09-123456789" pattern="[0-9]{2}-[0-9]{9}" required/>
        </div>

        <div class="mb-4">
          <label class={`block  text-sm font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`} for="address">
            Address
          </label>
          <textarea onChange={(e) => setAddress(e.target.value)} value={address} class={`shadow appearance-none border rounded-lg w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${isDark ? 'text-white ring ring-white' : 'text-gray-700'}`} id="address" name='address' type="text" placeholder="Street, City, State" required/>
        </div>

        <div class="mb-4">
          <label class={`block  text-sm font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`} for="address">
            Count
          </label>
          <input onChange={(e) => setCount(e.target.value)} value={count} class={`shadow appearance-none border rounded-lg w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline ${isDark ? 'text-white ring ring-white' : 'text-gray-700'}`} id="quantity" name='quantity' type="number" min={1} required/>
        </div>

        <button type='submit' className={` px-4 py-1  rounded-2xl cursor-pointer mt-2 w-full font-bold ${isDark ? 'ring-2 ring-brand text-purple-500' : 'bg-brand text-white'}`}>Order</button>

      </form>
      
    </div>
  )
}
