import React, { useEffect } from 'react';
//import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Signup from './features/auth/components/Signup';
import SignupPage from './pages/SignupPage';
//import Cart from './features/cart/Cart';
import ProductDetailsPage from './pages/ProductDetailsPage';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Protected from './features/auth/components/Protected';
import { fetchAllProductsAsync } from './features/product-list/ProductSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Home></Home>
      </Protected>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },

  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },

  { // only fir testing - then page will be added
    path: "/cart",
    element: <Protected> 
      <CartPage></CartPage>
      </Protected>,
  },

  { // only fir testing - then page will be added
    path: "/checkout",
    element: <Protected>
      <Checkout></Checkout>
      </Protected>,
  },

  { // only fir testing - then page will be added
    path: "/product-details/:id",
    element: <Protected> 
      <ProductDetailsPage></ProductDetailsPage>
      </Protected>,
  },
]);

function App() {
 const dispatch = useDispatch();
 const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user){
    dispatch(fetchItemsByUserIdAsync(user.id))
    }
  },[dispatch,user])
  return (<div className='APP'>
    {/* <Home></Home> */}
    {/* <LoginPage></LoginPage> */}
    {/* <SignupPage></SignupPage> */}

    <RouterProvider router={router} />

  </div>

  );
}

export default App;
