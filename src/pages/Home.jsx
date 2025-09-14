import Herosection from '../components/Herosection'
import Categories from '../components/Categories'
import CreateButton from '../components/CreateButton'
import { useContext } from 'react'
import { CheckContext } from '../contexts/CheckContext'


export default function Home() {

  let { isSeller } = useContext(CheckContext)

  return (
    <div>

        <Herosection/>

        <div className='h-screen mt-5 md:max-w-300 mx-auto max-w-100'>
          <h2 className='text-xl font-bold text-[#8E44AD]'>Choose Category Here...</h2>
          <Categories/>
        </div>
        
        { isSeller && <div className='bottom-1 right-0 fixed'>
          <CreateButton/>
        </div>}

    </div>
  )
}
