import React from 'react'
import Header from '../components/Header/Header'
import Navbar from '../components/Navbar/Navbar'
import Login from './Login'
import Footer from '../components/Footer/Footer'
import Copyright from '../components/Copyright/Copyright'

const page = () => {
  return (
    <div>
        <Header/>
        <Navbar/>
        <Login/>
        <Footer/>
        <Copyright/>
    </div>
  )
}

export default page