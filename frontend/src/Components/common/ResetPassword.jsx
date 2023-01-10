import { useState } from 'react'
import { useParams } from 'react-router'
import NavBar from '../../assets/NavBar'
import axios from "axios";
import "../../styles/ResetPassword.css"
import { RESET_PASS_URL_DEV } from '../../constants/constant';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [confPass, setConfPass] = useState("")
  const { id } = useParams()

  const userResetPass = async () => {
    try {
      if(!password|| !confPass){
        const a = toast.error("Please Fill All Data", {
          position: toast.POSITION.TOP_CENTER,
          closeOnClick: false,
          closeButton: false,
          style: {
            color: "red",
            backgroundColor: "rgb(255, 206, 206)"
          }
        })
        if (a == 1) {
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }
      }else{
        if (password === confPass) {
          const response = await axios.post(RESET_PASS_URL_DEV + "/" + id, { password })
          const data = await response.data
          if (data) {
            const a = toast.success(data.message,{
              position:toast.POSITION.TOP_CENTER,
              closeOnClick:false,
              closeButton:false,
              style:{
                color:"green",
                backgroundColor:"rgb(183, 248, 183)"
              }
            })
            if(a==1){
              setTimeout(() => {
                window.location.href="/"
              }, 2000);
            }
          }
        } else {
          const a = toast.error("Password don't Match !!!", {
            position: toast.POSITION.TOP_CENTER,
            closeOnClick: false,
            closeButton: false,
            style: {
              color: "red",
              backgroundColor: "rgb(255, 206, 206)"
            }
          })
          if (a == 1) {
            setTimeout(() => {
              window.location.reload()
            }, 2000);
          }
        }
      }
    } catch (error) {
      console.log(error)
      const a = toast.error("Network Error !!!", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: false,
        closeButton: false,
        style: {
          color: "red",
          backgroundColor: "rgb(255, 206, 206)"
        }
      })
      if (a == 1) {
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }
    }
  }

  return (
    <>
      <NavBar />
      <div className="card mx-auto">
        <div className="card-body">
          <h5 className="card-title text-light text-center">Reset Password</h5>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label text-light">Enter New Password</label>
            <input type="password" className="form-control" placeholder="Enter your new Passsword" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label text-light">Confirm Password</label>
            <input type="password" className="form-control" placeholder="Confirm Your New Password" value={confPass} onChange={(e) => setConfPass(e.target.value)} />
          </div>
        </div>
        <button className="btn btn-primary w-50 mx-auto mb-4" onClick={userResetPass}>Reset Password</button>
      </div>
      <ToastContainer autoClose={1000} />
    </>
  )
}

export default ResetPassword