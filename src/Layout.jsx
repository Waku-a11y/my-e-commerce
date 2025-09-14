import { CSSTransition, SwitchTransition } from "react-transition-group"
import Navbar from './components/Navbar'
import './index.css'
import { Outlet, useLocation } from 'react-router'
import { useRef } from 'react'

function Layout() {

  let nodeRef = useRef(null)
  let location = useLocation()
  let pathname = location.pathname

  return (
    <>
      <Navbar/>

    <SwitchTransition>
      <CSSTransition nodeRef={nodeRef} timeout={200} classNames='fade'key={pathname}>
        <div ref={nodeRef} className="max-w-300 mx-auto mt-5">
          <Outlet/>
        </div>
      </CSSTransition>
    </SwitchTransition>
      
    </>
  )
}

export default Layout
