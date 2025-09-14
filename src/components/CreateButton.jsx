import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { NavLink } from 'react-router'

export default function Create() {

  let { isDark } = useContext(ThemeContext)

  return (
    <NavLink to='/form'>
      <div className={`flex justify-center items-center text-lg font-bold gap-1.5 cursor-pointer shadow-2xl px-2 py-1 rounded-full duration-200 hover:shadow-[0_0_25px_#8E44AD] ${isDark ? 'text-white ring-2 ring-brand' : 'text-white bg-brand'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="white" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg><p className='md:inline hidden'>Add Product</p>
      </div>
    </NavLink>
  )
}
