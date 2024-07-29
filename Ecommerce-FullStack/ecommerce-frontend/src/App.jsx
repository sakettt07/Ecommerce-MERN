import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer';
import "./App.css"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AllApi from './common';
import Context from './context/userContext';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

const App = () => {
  const dispatch=useDispatch()
  const fetchUserDetails=async()=>{
    const dataResponse=await fetch(AllApi.current_user.url,{
      method:AllApi.current_user.method,
      credentials:"include"
    })
    const dataApi=await dataResponse.json();
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
  }
  useEffect(()=>{
    fetchUserDetails();
  },[])
  return (
    <>
    <Context.Provider value={fetchUserDetails}>
    <ToastContainer />
    <Header />
      <Outlet />
      <Footer />
      </Context.Provider>
    </>
  )
}

export default App
