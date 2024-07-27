import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer';
import "./App.css"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
    <ToastContainer />
    <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
