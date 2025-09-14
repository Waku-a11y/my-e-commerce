import jacket from '../assets/jacket.jpg'
import sneaker from '../assets/sneaker.jpg'
import backpack from '../assets/backpack.jpg'
import shorts from '../assets/shorts.jpg'
import hat from '../assets/hat.jpg'
import useFirestore from '../hooks/useFirestore'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { CheckContext } from '../contexts/CheckContext'

export default function Products() {

  const productImages = {
  jacket: jacket,
  sneaker: sneaker,
  hat: hat,
  backpack: backpack,
  shorts: shorts
}
  let location = useLocation() 
  let [ search, setSearch ] = useState('')
  let currentPath = location.pathname
  
  let { getCollection, deleteDocument } = useFirestore()
  let { error, loading, data : products } =  getCollection('products', null, { field : 'name', value : search})

  let { isSeller } = useContext(CheckContext)
  let { isDark } = useContext(ThemeContext)

  let navigate = useNavigate()

  let params = useParams()
  let type = params.type

  if(type !== 'all') {
    let filteredProducts  = products.filter((product) => {
      return product.type == type
    })
    products = filteredProducts
  }

const productDetail = (id) => {
  navigate(currentPath + '/' + id)
}

const editHandler = (e, product) => {
  e.preventDefault()
  e.stopPropagation()
  navigate('/form/' + product.id)
}

const deleteHandler = async(e, product) => {
  e.stopPropagation()
  e.preventDefault()
  await deleteDocument('products', product.id)
}

  return (
    <div className='mt-4 p-5'>
    
      <div className='flex max-w-100 mx-auto p-1 md:max-w-300 items-center justify-around'>

        <svg onClick={() => navigate('/')} className='ring-2 ring-brand w-7 h-7 mb-2 p-1 md:w-10 md:mb-4 md:h-10 md:p-2 rounded-full flex justify-center items-center cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill={`${isDark ? 'white' : 'black'}`}><path d="M640-107.69 267.69-480 640-852.31l42.54 42.54L352.77-480l329.77 329.77L640-107.69Z"/></svg>

        <div class="flex rounded-md border-2 border-brand mb-5 overflow-hidden w-60 md:w-100 mx-auto">
        <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search ..."
          class="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3" />
          <button type='button' class="flex items-center justify-center cursor-pointer bg-[#8E44AD] px-5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-white">
            <path
              d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
            </path>
          </svg>
        </button>
      </div>
      </div>

    <div className='grid grid-cols-2 space-x-2 max-w-100 md:max-w-300 mx-auto p-4 md:grid-cols-4 md:space-x-4 flex-wrap select-none'>
      
      { loading && <div className='loader w-10 h-10 mt-20 ml-50 md:w-20 md:h-20 md:mt-40 md:ml-130'></div>}
      { error && <p>{error}</p>}
      { !error && products && products.map((product) => (
        <div onClick={() => productDetail(product.id)} className='ring-2 ring-purple-500 shadow-lg w-35 md:w-68 cursor-pointer h-auto p-5 flex flex-col mt-5 justify-center items-center bg-white rounded-xl'>

        <div className='flex '>

          <img src={productImages[product.type]} className='w-15 h-15 md:w-53 md:h-53 rounded-xl' alt=""  />

        </div>


        <div className='flex justify-center items-start flex-col space-y-3'>
          <h3 className='md:text-xl text-[16px]'>{product.name}</h3>
        </div>

        {isSeller && <div className='flex items-center w-full justify-end gap-4 mt-3 md:gap-7 md:mt-5'>

        <button onClick={(e) => editHandler(e, product)} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="md:size-6 size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
        </button>

        <button onClick={(e) => deleteHandler(e,product)} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="md:size-6 size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
        </button>

        </div>}

      </div>
      ))}
      {!products.length && <div className='text-xl font-bold text-gray-400 h-100 w-290 flex items-center justify-center'>No search result found...</div>}
    </div>
    </div>
  )
}
{/* {!product?.fav && <svg onClick={(e) => favHandler(e, product)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" size-12 hover:scale-120 duration-150">
<path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>}

{product?.fav && <svg onClick={(e) => favHandler(e, product)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className=" size-12 hover:scale-120 duration-150">
<path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
</svg>} */}