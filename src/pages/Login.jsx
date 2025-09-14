import React, { useContext, useState } from 'react'
import bg from '../assets/background.jpg'
import Von from '../assets/von.svg'
import Voff from '../assets/voff.svg'
import Vonl from '../assets/vonl.svg'
import Voffl from '../assets/voffl.svg'
import { Link, useNavigate } from 'react-router'
import { ThemeContext } from '../contexts/ThemeContext'
import bgl from '../assets/backgroundlg.jpg'
import useLogin from '../hooks/useLogin'

export default function Login() {

  let [ show, setShow ] = useState(false)
  let { isDark } = useContext(ThemeContext)
  let navigate = useNavigate()

  let [ email, setEmail ] = useState('')
  let [ password, setPassword ] = useState('')

  let { error, loading, login } = useLogin()

  let loginBtn = async() => {
    let user = await login(email, password)
    if (user) {
      navigate ('/')
    }
  }

  return (
    <div className='mt-10 h-120 select-none'>

        <div className='flex justify-between items-start md:max-w-220 max-w-80 mx-auto md:border bg-[#181743] md:border-purple-900 rounded-xl'>

          {isDark && <img src={bg} alt="" className='md:w-120 md:h-120 hidden md:inline md:rounded-l-xl' />}

          {!isDark && 
          <div className='md:w-270 md:h-120 bg-[#181743] hidden md:flex justify-center items-center md:rounded-l-xl '>
            <img src={bgl} alt="" className='md:w-90 md:h-80 rounded-l-xl '/>
          </div>}

          <div className={`flex flex-col justify-center  w-[100%] md:h-120 mt-0 items-center rounded-2xl md:rounded-r-xl ${isDark? 'bg-black' : 'bg-[#181743]'}`}>
            <div className={`w-80 h-auto backdrop-blur-3xl ring-2 rounded-xl p-5 py-16 space-y-3 ${isDark? 'text-brand' : 'text-white'}`}>
                <h2 className='font-bold text-xl'>Login Form</h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-200'}`}>If You are already a member, Easily Login</p>

                <div className='flex items-center mt-5 space-x-2'>
                  <svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill={`${isDark? '#8E44AD' : '#ffffff'}`}><path d="M184.62-200q-27.62 0-46.12-18.5Q120-237 120-264.62v-430.76q0-27.62 18.5-46.12Q157-760 184.62-760h590.76q27.62 0 46.12 18.5Q840-723 840-695.38v430.76q0 27.62-18.5 46.12Q803-200 775.38-200H184.62ZM480-475.38 160-684.62v420q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h590.76q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-420L480-475.38Zm0-44.62 307.69-200H172.31L480-520ZM160-684.62V-720v455.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92H160v-444.62Z"/></svg>
                  <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className='border-b-2 text-sm font-semibold focus:outline-0 p-2' placeholder='Email'/>
                </div>

                <div className='flex items-center mt-5 space-x-2 cursor-pointer'>
                  {isDark && <div>
                    {!show && <img src={Voff} className='w-8 h-8' onClick={() => setShow(true)} alt="" />}
                    {show && <img src={Von} className='w-8 h-8' onClick={() => setShow(false)} alt="" />}
                  </div>}

                  {!isDark && <div>
                    {!show && <img src={Voffl} className='w-8 h-8' onClick={() => setShow(true)} alt="" />}
                    {show && <img src={Vonl} className='w-8 h-8' onClick={() => setShow(false)} alt="" />}
                  </div>}
                  
                  
                  <input type={`${show ? 'text' : 'password'}`} onChange={(e) => setPassword(e.target.value)} value={password} className='border-b-2 text-sm font-semibold focus:outline-0 p-2' placeholder='Password' />
                </div>

                {error && <p className={`text-center text-sm ${isDark? 'text-rose-500' : 'text-gray-400'}`}>{error}</p>}
                
                <div className='flex justify-center items-center'>
                  <button type='button' onClick={loginBtn} className={`font-bold shadow-lg cursor-pointer px-3 mt-3 text-center rounded-lg py-0.5 ${isDark ? 'bg-brand shadow-[#8E44AD]/50 text-black' : 'bg-white shadow-white/50 text-brand'}`}>
                   {loading && <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101"  xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#8E44AD"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#f26923"></path>
                    </svg>}
                  Login
                  </button>
                </div>
                <p className={`text-sm mt-6 ${isDark ? 'text-gray-400' : 'text-gray-300'}`}>If you don't have an account <Link to='/register'><span className={`text-shadow-md cursor-pointer ${isDark ? 'text-brand' : 'text-white'}`}>Register</span></Link> </p>
                
            </div>
          </div>

        </div>
      
    </div>
  )
}
