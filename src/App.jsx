import React from 'react'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"


const App = () => {

  axios.defaults.withCredentials = true;
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className='my-2'>
        <Outlet />
      </Container>
      
    </>
  )
}

export default App
