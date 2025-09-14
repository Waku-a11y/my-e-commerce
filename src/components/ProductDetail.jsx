import { collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router'
import { db } from '../Firebase/firebase'
import jacket from '../assets/jacket.jpg'
import sneaker from '../assets/sneaker.jpg'
import backpack from '../assets/backpack.jpg'
import shorts from '../assets/shorts.jpg'
import hat from '../assets/hat.jpg'
import { ThemeContext } from '../contexts/ThemeContext'
import useFirestore from '../hooks/useFirestore'
import { AuthContext } from '../contexts/AuthContext'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"

export default function ProductDetail() {

  let param = useParams()
  let id = param.id

  let { user } = useContext(AuthContext)

  const productImages = {
    jacket: jacket,
    sneaker: sneaker,
    hat: hat,
    backpack: backpack,
    shorts: shorts
  }


  let { isDark } = useContext(ThemeContext)

  let navigate = useNavigate()

  let { updateDocument, getDocument, getCollection, addDocument } = useFirestore()

  let userData;

  let { data } = getCollection('users', ['userID' , '==', user.uid]);

  data?.forEach(d => {
    if (d.productID == id) {
      userData = d
    }
    else {
      return;
    }
  });

  let { data : productObj , error, loading } = getDocument('products', id)

  let product = [productObj]

const favHandler = async (e, product) => {
  e.preventDefault()

  const q = query(
    collection(db, "users"),
    where("productID", "==", product.id),
    where("userID", "==", user.uid)
  )

  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
      const data = {
      productID: product.id,
      userID: user.uid,
      name: product.name,
      price: product.price,
      size: product.size,
      type: product.type,
      fav: true,
      date: serverTimestamp()
    }
    await addDocument ('users', data, false)
  } 
  else {
    await updateDocument ('users', userData?.id, { fav : !userData?.fav})
  }
}

const addCart = async(e, id, product) => {
  e.preventDefault()
  if (userData?.productID == id) {
    const data = {
      productID: product.id,
      userID: user.uid,
      name: product.name,
      price: product.price,
      size: product.size,
      type: product.type,
      cart : !userData?.cart
    }
    await updateDocument('users', userData?.id, data)
    if (!userData?.cart) {
      toast.success(`${product.name} was added to cart`)
    }
  }
  else {
    const data = {
      productID: product.id,
      userID: user.uid,
      name: product.name,
      price: product.price,
      size: product.size,
      type: product.type,
      cart : true,
      date : serverTimestamp()
    }
    await addDocument ('users', data, false)
    if (!userData?.cart) {
      toast.success(`${product.name} was added to cart`)
    }
  }
}

  return (
    <>
      <div className='md:max-w-300 max-w-100 mx-auto mt-5 space-y-2 md:space-y-5'>
      {product && product.map((p) => (
        <div className={`flex md:space-x-15 space-x-3 ${isDark ? 'text-white' : ''}`}>
          <svg onClick={() => navigate('/products/all')} className='ring-2 ring-brand md:w-10 md:h-10 md:p-2 w-5 h-5 p-1 rounded-full flex justify-center items-center cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill={`${isDark ? 'white' : 'black'}`}><path d="M640-107.69 267.69-480 640-852.31l42.54 42.54L352.77-480l329.77 329.77L640-107.69Z"/></svg>
          
            <img src={productImages[p.type]} className='w-50 h-50 ml-0 md:w-120 md:h-120 md:ml-40 rounded-lg' alt="" />

          <div className='md:space-y-5 space-y-2 flex flex-col justify-center'>
            <h2 className='text-md md:text-2xl font-bold'>{p.name}</h2>
            <h3 className='text-sm md:text-xl'>Size - {p.size}</h3>
            <h4 className='text-sm md:text-xl'>Price - {p.price} MMK</h4>

            <div className='space-y-4 flex flex-col justify-center items-center'>
              
              {userData?.fav && <button onClick={(e) => favHandler(e, p)} className='w-full md:px-2 md:py-1 md:text-[16px] px-1 py-0.5 text-sm bg-rose-500 text-white cursor-pointer rounded-lg duration-300 hover:shadow-[0_0_15px_#FA003F]'>Favourite</button>}
              {!userData?.fav && <button onClick={(e) => favHandler(e, p)} className='w-full md:px-2 md:py-1 md:text-[16px] px-1 py-0.5 text-sm ring-2 ring-rose-500 cursor-pointer rounded-lg duration-300 hover:shadow-[0_0_15px_#FA003F]'>Add to Favourite</button>}

              <div className='space-x-3 justify-center flex'>
                <button onClick={() => navigate(`/buynow/${p.id}`)} className='lighting-btn cursor-pointer bg-brand text-white md:px-2 md:py-1 px-1 py-0.5 text-sm md:text-[16px] rounded-lg'>Buy Now</button>
                {!userData?.cart && <button type='button' onClick={(e) => addCart(e, p.id, p)} className={`${isDark ? 'bg-black text-gray-400' : 'bg-white'}cursor-pointer md:px-2 md:py-1 px-1 py-0.5 md:text-[16px] text-sm  ring-2 ring-brand rounded-lg duration-300 hover:shadow-[0_0_15px_#8E44AD] `}>Add to Cart</button>}
                {userData?.cart && <button type='button' onClick={(e) => addCart(e, p.id, p)} className={`text-white cursor-pointer flex gap-1 items-center bg-green-500 md:px-2 md:py-1 px-1 py-0.5 md:text-[16px] text-sm rounded-lg duration-300 hover:shadow-[0_0_15px_green] `}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  In Cart</button>}
              </div>

            </div>

          </div>


        </div>
      ))}
    </div>

    <ToastContainer position="bottom-right" autoClose={1500} />



    </>
  )
}
