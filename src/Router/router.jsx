import { createBrowserRouter, Navigate } from "react-router";
import Layout from "../Layout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Login from '../pages/Login'
import Register from "../pages/Register";
import { RouterProvider } from 'react-router'
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ProductDetail from "../components/ProductDetail";
import Wishlist from "../pages/Wishlist";
import Form from "../pages/Form";
import Buynow from "../pages/Buynow";
import Orders from "../pages/Orders";
import { CheckContext } from "../contexts/CheckContext";


export default function Router() {

  let { authReady, user } = useContext(AuthContext)
  let isAuth = Boolean(user)

  let { isSeller } = useContext(CheckContext)


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children : [
    {
      path : "/",
      element : isAuth ? <Home/> : <Navigate to = '/login'/>
    },
    {
      path : "/products",
      element : isAuth ? <Products/> : <Navigate to = '/login'/>
    },
    {
      path : "/cart",
      element : isAuth ? <Cart/> : <Navigate to = '/login'/>
    },
    {
      path : "/wishlist",
      element : isAuth ? <Wishlist/> : <Navigate to = '/login'/>
    },
    {
      path: "/form",
      element: isSeller ?  <Form />  : <Navigate to="/" />
    },
    {
      path: "/form/:id",
      element: isSeller ?  <Form />  : <Navigate to="/" />
    },
    {
      path : '/buynow/:id',
      element : isAuth ? <Buynow/> : <Navigate to = '/login'/>
    },
    {
      path : '/orders',
      element: isSeller ?  <Orders />  : <Navigate to="/" />
    },
    {
      path : "/products/:type",
      element : isAuth ? <Products/> : <Navigate to = '/login'/>
    },
    {
      path : "/products/:type/:id",
      element : isAuth ? <ProductDetail/> : <Navigate to = '/login'/>
    },
    {
      path : "/login",
      element : !isAuth ? <Login/> : <Navigate to = '/'/>
    },
    {
      path : "/register",
      element : !isAuth ? <Register/> : <Navigate to = '/'/>
    }
    ]
  },
]);

  return (
    authReady && <RouterProvider router={router} />
  )
}
