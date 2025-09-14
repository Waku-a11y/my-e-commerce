import React, { useContext } from 'react'
import useFirestore from '../hooks/useFirestore'
import { ThemeContext } from '../contexts/ThemeContext'
import Gif from '../assets/sad.gif'

export default function Orders() {

  let { getCollection, deleteDocument } = useFirestore()
  let { data : orders, loading, error } = getCollection('orders')

  let { isDark } = useContext(ThemeContext)

  const doneHandler = async(e, id) => {
    await deleteDocument('orders', id)
  }

  return (
    <div>
        <p className='mb-3 font-bold md:ml-0 md:text-xl text-md ml-4 text-brand'>Customer Orders ...</p>
            <div className={`grid md:grid-cols-2 grid-cols-1 space-x-5 mt-3 ${isDark ? 'text-white' : 'text-black'}`}>
            { orders && orders.map((order) => (
                <div className={`p-5 border-brand text-[12px] md:text-[16px] shadow-xl mb-2 md:mb-4 w-70 mx-auto md:w-140 ml-4 md:ml-0 space-y-2 ${isDark ? 'border-2 rounded-xl shadow-white/15' : 'border-l-2 border-b-2'}`}>
                    <p>Customer Name - {order.name}</p>
                    <p>Phone Number - {order.phnum}</p>
                    <p className=''>Address - {order.address}</p>
                    <p>Email - {order.email}</p>
                    <p>Product Name - {order.productName}</p>
                    <p className='flex justify-between items-center'>Quantity - {order.count} 
                      <div onClick={(e) => doneHandler(e, order.id)} className={`flex items-center gap-1 md:gap-2 md:text-[16px] text-[10px] font-bold rounded cursor-pointer px-1.5 py-0.5 md:px-3 md:py-1 ${isDark ? 'ring-2 ring-green-500 text-green-500' : 'bg-green-500 text-white'}`}>
                        <button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={`${isDark ? 'green' : 'white'}`}><path d="M268-267.69 69.69-466l28.54-28.31 170 170L295.92-352l28.31 28.31-56.23 56Zm226 0L295.69-466 324-494.54l170 170 368-368L890.31-664 494-267.69ZM466.31-466l-28.54-28.31 198-198L664.31-664l-198 198Z"/></svg></button>
                      Done
                      </div>
                    </p>
                </div>
            ))}
            {
              !orders.length && 
              <div className=' w-300 flex flex-col justify-center items-center'>
                <img src={Gif} alt="" className='w-80 h-80'/>
                <p className='text-xl font-bold text-gray-400'>No order for now</p>
              </div>
            }
            </div>
    </div>
  )
}
