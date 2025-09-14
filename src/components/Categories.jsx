import Jacket from '../assets/jacket1.jpg'
import Products from '../assets/products.jpg'
import Hat from '../assets/hat1.jpg'
import Sneaker from '../assets/sneaker1.jpg'
import Backpack from '../assets/backpack1.jpg'
import Shorts from '../assets/shorts1.jpg'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { Link } from 'react-router'

export default function Categories() {

let { isDark } = useContext(ThemeContext)

  return (
    <ul className='grid grid-cols-3 max-w-100 md:max-w-300 mx-auto md:grid-cols-4 flex-wrap mt-3 cursor-pointer'>

      <Link to = '/products/all'>
        <div className={`bg-[#ffffff] md:mb-8 md-4 ring-2 shadow-xl h:30 md:h-70 md:w-auto w-30 rounded-xl ${isDark ? 'ring-[#8E44AD]' : 'ring-[#000000]'}`}>
            <li className='flex flex-col items-center justify-center p-5'>
            <p className=' font-bold text-xs md:text-xl text-brand'>All Products</p>
            <img src={Products} alt="" className='md:w-45 md:h-45 md:mt-4 w-20 h-20 mt-1'/>
            </li>
        </div>
      </Link>

      <Link to = '/products/jacket'>
          <div className={`bg-[#c1ebf9] mb-8 ring-2 md:ml-3 shadow-xl h:30 w-30 md:w-auto md:h-70 rounded-xl ${isDark ? 'ring-[#8E44AD]' : 'ring-[#000000]'}`}>
              <li className='flex flex-col items-center justify-center p-5'>
              <p className=' font-bold text-md md:text-xl'>Jackets</p>
              <img src={Jacket} alt="" className='md:w-45 md:h-45 md:mt-4 w-20 h-20 transform transition duration-200 mt-1 hover:scale-110'/>
              </li>
          </div>
      </Link>

      <Link to = '/products/sneaker'>
        <div className={`bg-[#ff5b5a] mb-8 md:ml-3 ring-2 shadow-xl h:30 w-30 md:w-auto md:h-70 rounded-xl ${isDark ? 'ring-[#8E44AD]' : 'ring-[#000000]'}`}>
            <li className='flex flex-col items-center justify-center p-5'>
            <p className='text-white font-bold text-md md:text-xl'>Sneakers</p>
            <img src={Sneaker} alt="" className='md:w-45 md:h-45 md:mt-4 w-20 h-20 transform transition duration-200 mt-1 hover:scale-110'/>
            </li>
        </div>
      </Link>

      <Link to = '/products/hat'>
        <div className={`bg-[#fab87b] mb-8 md:ml-3 ring-2 shadow-xl h:30 w-30 md:w-auto md:h-70 rounded-xl ${isDark ? 'ring-[#8E44AD]' : 'ring-[#000000]'}`}>
            <li className='flex flex-col items-center justify-center p-5'>
            <p className='text-black font-bold text-md md:text-xl mb-5'>Hats</p>
            <img src={Hat} alt="" className='md:w-45 md:h-45 md:mt-4 w-17 h-17 transform transition duration-200 mt-0 hover:scale-110'/>
            </li>
        </div>
      </Link>

      <Link to = '/products/shorts'>
        <div className={`bg-[#5d75a1] mb-8 ring-2 shadow-xl h:30 w-30 md:w-auto md:h-70 rounded-xl ${isDark ? 'ring-[#8E44AD]' : 'ring-[#000000]'}`}>
            <li className='flex flex-col items-center justify-center p-5'>
            <p className='text-white font-bold text-md md:text-xl'>Shorts</p>
            <img src={Shorts} alt="" className='md:w-45 md:h-45 md:mt-4 w-20 h-20 transform transition duration-200 mt-1 hover:scale-110'/>
            </li>
        </div>
      </Link>

      <Link to = '/products/backpack'>
        <div className={`bg-[#f5f5f5] mb-8 ring-2 md:ml-3 shadow-xl h:30 w-30 md:w-auto md:h-70 rounded-xl ${isDark ? 'ring-[#8E44AD]' : 'ring-[#000000]'}`}>
            <li className='flex flex-col items-center justify-center p-5'>
            <p className=' font-bold text-md md:text-xl'>Backpack</p>
            <img src={Backpack} alt="" className='md:w-45 md:h-45 md:mt-4 w-20 h-20 transform transition duration-200 mt-1 hover:scale-110'/>
            </li>
        </div>   
      </Link>     
    </ul>
  )
}
