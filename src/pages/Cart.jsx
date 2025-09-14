import React, { useContext, useEffect, useState } from 'react'
import useFirestore from '../hooks/useFirestore'
import jacket from '../assets/jacket.jpg'
import sneaker from '../assets/sneaker.jpg'
import backpack from '../assets/backpack.jpg'
import shorts from '../assets/shorts.jpg'
import hat from '../assets/hat.jpg'
import { AuthContext } from '../contexts/AuthContext'
import cartt from '../../public/cartt.gif'
import { useNavigate } from 'react-router'


export default function Cart() {

  const productImages = {
    jacket: jacket,
    sneaker: sneaker,
    hat: hat,
    backpack: backpack,
    shorts: shorts
  }

  let { getCollection, updateDocument } = useFirestore()
  let { user } = useContext(AuthContext)
  let { error, loading, data : p } = getCollection('users', ['userID', '==', user.uid])

  let navigate = useNavigate()

  let [ products , setProducts ] = useState([])

  useEffect(() => {
    setProducts(p)
  }, [p])

  let productsInCart = products.filter((product) => {
    return product.cart == true
  })

  const removeCart = async(id, product) => {
    product.cart = false
    setProducts ( previousState => previousState.filter((p) => p.id !== product.id))
    await updateDocument ('users', id, {...product})
  }

  const buyNow = (e, product) => {
    e.preventDefault()
    navigate('/buynow/' + product.productID)
  }

  return (
    <div className='space-y-5 md:max-w-300 mx-auto max-w-100'>
      { loading && <div className='loader w-20 h-20 mt-40 ml-130'></div>}
      { productsInCart && productsInCart.map((product) => (
        <div className='ring ring-black bg-white flex justify-around items-center rounded-xl h-auto'>
          <img src={productImages[product.type]} alt="" className='md:w-35 md:h-35 w-12 h-12 rounded-2xl' />
          <h2 className='md:text-2xl text-[9px] font-bold'>{product.name}</h2>
          <p className='md:text-xl text-[9px]'>Size - {product.size}</p>
          <p className='md:text-xl text-[9px]'>Price - {product.price} MMK</p>
          
          <div className='space-x-4 flex items-center'>
            <button onClick={(e) => buyNow (e, product)} className='bg-green-500 text-[9px] p-0.5 text-white md:text-[16px] md:px-2 md:py-0.5 rounded cursor-pointer'>Buy Now</button>
            <button onClick={() => removeCart(product.id, product)} className='bg-rose-500 text-white text-[9px] p-0.5 md:text-[16px] md:px-2 md:py-0.5 rounded cursor-pointer'>Remove</button>
          </div>
        </div>
      )) }
      { !productsInCart.length && <div className='md:text-xl text-[16px] font-bold text-gray-400 h-140 flex flex-col justify-center items-center'>
           <img src={cartt} alt="" className='md:w-55 md:h-55 w-30 h-30'/>
           <p>No Product in your cart</p>
        </div>}
    </div>
  )
}
