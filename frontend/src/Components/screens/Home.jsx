import axios from 'axios'
import { useState, useEffect } from 'react'
import {  useParams } from 'react-router'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { DECODE_USER_DEV } from '../../constants/constant'
import NavBar from '../../assets/NavBar'

const Home = () => {
  const [Data, setData] = useState("")
  const token = localStorage.getItem("jwt")
 
  useEffect(() => {
   if (!token) {
     window.location.href = "/unauthorized"
   } else {
     axios.post(DECODE_USER_DEV, "", {
       headers: {
         'authorization': token
       }
     }).then(res => {
       if (res.data.role === "user") {
         window.location.href = "/unauthorized"
       } else {
         setData(res.data)
       }
     })
   }
 }, [])

  return (
    <>
      <NavBar userName={Data.userName}/>
    </>
  )
}

export default Home