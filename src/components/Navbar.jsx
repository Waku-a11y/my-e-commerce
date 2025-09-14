import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import Light from '../assets/light.svg'
import Dark from '../assets/dark.svg'
import { ThemeContext } from '../contexts/ThemeContext'
import { AuthContext } from '../contexts/AuthContext'
import useLogout from '../hooks/useLogout'
import { CheckContext } from '../contexts/CheckContext'

export default function Navbar() {

    let { changeTheme, isDark } = useContext(ThemeContext)
    let { user } = useContext(AuthContext)
    let { isSeller } = useContext(CheckContext)

    let navigate = useNavigate()

    let body = document.getElementsByTagName('body')[0]
    if (isDark) {
        body.classList.add('bg-black')
        body.classList.remove('bg-c')
    }
    else {
        body.classList.remove('bg-black')
        body.classList.add('bg-c')
    }

    let { error, loading, logout } = useLogout()
    let logoutBtn = async () => {
        let user = await logout()
        if(!user) {
            navigate('/login')
        }
    }

  return (
    <div>
        <nav className={`max-w-100 mx-auto border-b border-[#8E44AD] shadow-md p-3 md:max-w-300 ${isDark ? 'bg-black dark' : 'light'}`}>

            <ul className='flex justify-between items-center'>

                <div className='flex items-center gap-2 md:gap-5 w-50 '>
                    {isSeller && <li className='cursor-pointer'>
                        <div className={`w-4 h-4 text-sm md:w-8 md:h-8 flex justify-center text-[10px] md:text-[16px] items-center text-white rounded ${isDark ? 'ring-2 ring-rose-500 bg-black' : 'bg-rose-500'}`}>A</div>
                    </li>}

                    {!isSeller && user && <li className='cursor-pointer'>
                        <div className={` w-5 h-5 text-sm md:w-8 md:h-8 flex justify-center text-[10px] md:text-[16px] items-center text-white rounded ${isDark ? 'ring-2 ring-blue-500 bg-black' : 'bg-blue-500'}`}>C</div>
                    </li>}
                
                    <li className='cursor-pointer'>
                        {!isDark && <img src={Dark} alt="" onClick={() => changeTheme('dark')} className='w-5 h-5 md:w-8 md:h-8' />}
                        {isDark && <img src={Light} alt="" onClick={() => changeTheme('light')} className='w-5 h-5 md:w-8 md:h-8'/>}
                    </li>

                </div>

                <Link to = '/'><li className={`md:ml-0 ml-9 text-md cursor-pointer font-bold md:text-2xl logo ${isDark ? 'text-white' : 'text-brand'}`}>Best4U</li></Link>

                <div className='flex w-50 ml-3 md:w-70 justify-between items-center'>

                    <NavLink to='/'>
                        <li>
                            <svg className='w-5 h-5 md:w-8 md:h-8 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill={`${isDark? '#ffffff' : '#8E44AD'}`}><path d="M240-200h147.69v-235.38h184.62V-200H720v-360L480-741.54 240-560v360Zm-40 40v-420l280-211.54L760-580v420H532.31v-235.38H427.69V-160H200Zm280-310.77Z"/></svg>
                        </li>
                    </NavLink>

                    <NavLink to='/cart'>
                        <li>
                            <svg className='w-5 h-5 md:w-8 md:h-8 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill={`${isDark? '#ffffff' : '#8E44AD'}`}><path d="M292.31-115.38q-25.31 0-42.66-17.35-17.34-17.35-17.34-42.65 0-25.31 17.34-42.66 17.35-17.34 42.66-17.34 25.31 0 42.65 17.34 17.35 17.35 17.35 42.66 0 25.3-17.35 42.65-17.34 17.35-42.65 17.35Zm375.38 0q-25.31 0-42.65-17.35-17.35-17.35-17.35-42.65 0-25.31 17.35-42.66 17.34-17.34 42.65-17.34t42.66 17.34q17.34 17.35 17.34 42.66 0 25.3-17.34 42.65-17.35 17.35-42.66 17.35ZM235.23-740 342-515.38h265.38q6.93 0 12.31-3.47 5.39-3.46 9.23-9.61l104.62-190q4.61-8.46.77-15-3.85-6.54-13.08-6.54h-486Zm-19.54-40h520.77q26.08 0 39.23 21.27 13.16 21.27 1.39 43.81l-114.31 208.3q-8.69 14.62-22.58 22.93-13.88 8.31-30.5 8.31H324l-48.62 89.23q-6.15 9.23-.38 20 5.77 10.77 17.31 10.77h435.38v40H292.31q-35 0-52.23-29.5-17.23-29.5-.85-59.27l60.15-107.23L152.31-820H80v-40h97.69l38 80ZM342-515.38h280-280Z"/></svg>
                        </li>
                    </NavLink>

                    <NavLink to = '/wishlist'>
                        <li>
                            <svg className='w-5 h-5 md:w-8 md:h-8 cursor-pointer' xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" fill={`${isDark? '#ffffff' : '#8E44AD'}`}><path d="m480-173.85-30.31-27.38q-97.92-89.46-162-153.15-64.07-63.7-101.15-112.35-37.08-48.65-51.81-88.04Q120-594.15 120-634q0-76.31 51.85-128.15Q223.69-814 300-814q52.77 0 99 27t81 78.54Q514.77-760 561-787q46.23-27 99-27 76.31 0 128.15 51.85Q840-710.31 840-634q0 39.85-14.73 79.23-14.73 39.39-51.81 88.04-37.08 48.65-100.77 112.35Q609-290.69 510.31-201.23L480-173.85Zm0-54.15q96-86.77 158-148.65 62-61.89 98-107.39t50-80.61q14-35.12 14-69.35 0-60-40-100t-100-40q-47.77 0-88.15 27.27-40.39 27.27-72.31 82.11h-39.08q-32.69-55.61-72.69-82.5Q347.77-774 300-774q-59.23 0-99.62 40Q160-694 160-634q0 34.23 14 69.35 14 35.11 50 80.61t98 107q62 61.5 158 149.04Zm0-273Z"/></svg>
                        </li>
                    </NavLink>

                    <NavLink to='/orders'>
                        {isSeller && <li>
                            <svg className='w-5 h-5 md:w-8 md:h-8 cursor-pointer' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={`${isDark? '#ffffff' : '#8E44AD'}`}><path d="M200-200v-436l-70.31-154.62 36.62-17.07L243.38-638h473.24l77.07-169.69 36.62 17.07L760-636v436H200Zm200-260h160q8.5 0 14.25-5.76t5.75-14.27q0-8.51-5.75-14.24T560-500H400q-8.5 0-14.25 5.76T380-479.97q0 8.51 5.75 14.24T400-460ZM240-240h480v-358H240v358Zm0 0v-358 358Z"/></svg>
                        </li>}
                    </NavLink>

                    <Link to='/login'>

                        {!user && 
                            <button className={`flex items-center text-xs md:text-[16px] cursor-pointer ${isDark ? 'ring-blue-600 ring-2 px-1.5 rounded-lg text-white py-0.5' : 'bg-blue-600 px-1.5 rounded-lg text-white py-0.5'}`}>
                                <svg className='w-5 h-5 md:w-7 md:h-7' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M479.23-160v-40h256.15q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H479.23v-40h256.15q27.62 0 46.12 18.5Q800-763 800-735.38v510.76q0 27.62-18.5 46.12Q763-160 735.38-160H479.23Zm-28.46-178.46-28.08-28.77L515.46-460H160v-40h355.46l-92.77-92.77 28.08-28.77L592.31-480 450.77-338.46Z"/></svg>
                                Login
                            </button>
                        }

                        {!!user && 
                            <button onClick={logoutBtn} className={`flex items-center text-xs md:text-[16px] cursor-pointer ${isDark ? 'ring-rose-500 ring-2 px-1 rounded-lg text-white py-0.5' : 'bg-rose-500 px-1 rounded-lg text-white py-0.5'}`}>
                                <svg className='w-5 h-5 md:w-7 md:h-7' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill='white'><path d="M224.62-160q-27.62 0-46.12-18.5Q160-197 160-224.62v-510.76q0-27.62 18.5-46.12Q197-800 224.62-800h256.15v40H224.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69h256.15v40H224.62Zm433.84-178.46-28.08-28.77L723.15-460H367.69v-40h355.46l-92.77-92.77 28.08-28.77L800-480 658.46-338.46Z"/></svg>
                                Logout
                            </button>
                        }

                    </Link>
                               
                </div>

            </ul>

        </nav>
    </div>
  )
}
