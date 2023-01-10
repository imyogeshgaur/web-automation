import "../../styles/AddProduct.css"
import NavBar from '../../assets/NavBar'
import { useEffect, useState } from 'react'
import axios from "axios";
import { DECODE_USER_DEV } from '../../constants/constant'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AddPdf = () => {
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

export default AddPdf