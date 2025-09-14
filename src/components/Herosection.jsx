import React, { useContext } from 'react'
import BgD from '../assets/purpleBg.jpg'
import BgL from '../assets/purpleBglight.jpg'
import { ThemeContext } from '../contexts/ThemeContext'

export default function Herosection() {

  let { isDark } = useContext(ThemeContext)

  return (
    <div>

      {isDark && <div className='bg-[#000000] ring-2 ring-brand rounded-2xl max-w-100 md:max-w-300 mx-auto text-white flex justify-around items-center p-10 mt-5'>
        <h2 className='text-2xl md:text-4xl'>Buy <span className='text-4xl md:text-6xl font-bold'>JOY</span>,<br/>Not Things.</h2>
        <img src={BgD} alt="" className='w-50 h-50'/>
      </div>}

      {!isDark && <div className='bg-[#c398e8] shadow-lg max-w-100 md:max-w-300 mx-auto text-white flex justify-around items-center p-10 mt-5'>
        <h2 className='text-2xl md:text-4xl'>Buy <span className='text-4xl md:text-6xl font-bold'>JOY</span>,<br/>Not Things.</h2>
        <img src={BgL} alt="" className='w-50 h-50'/>
      </div>}

    </div>

  )
}
