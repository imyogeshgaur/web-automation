import { useState } from 'react'
import NavBar from '../../assets/NavBar'
import { FORGET_PASS_URL_DEV } from '../../constants/constant'
import axios from "axios"
import "../../styles/ForgetPassword.css"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const userForgetPass = async () => {
    try {
      if (!email) {
        const a = toast.error("Please Provide Email !!!", {
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
      } else {
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
          const a = toast.error("Please Fill Email In Correct Format !!!", {
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
        } else {
          const response = await axios.post(FORGET_PASS_URL_DEV, { email });
          const data = await response.data;
          if (data.message === "User Not Exist !!!") {
            const a = toast.error(data.message, {
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
            setEmail("")
          } else {
            const a = toast.success(data.message, {
              position: toast.POSITION.TOP_CENTER,
              closeOnClick: false,
              closeButton: false,
              style: {
                color: "green",
                backgroundColor: "rgb(183, 248, 183)"
              }
            })
            if (a == 1) {
              setTimeout(() => {
                window.location.reload()
              }, 2000);
            }
            setEmail("")
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

  const goToPreviousPage = () => {
    window.history.back();
  }
  return (
    <>
      <NavBar />
      <div className="card mx-auto">
        <div className="card-body">
          <h5 className="card-title text-light text-center">Registered Email</h5>
          <div className="mb-3">
            <input type="email" className="form-control mt-4" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <button className="btn btn-primary w-50 mx-auto mb-4" onClick={userForgetPass}>Send Reset Link</button>
        <button className="btn btn-success w-50 mx-auto mb-4" onClick={goToPreviousPage}>Back To Login</button>

        <ToastContainer autoClose={1000} />
      </div>
    </>
  )
}

export default ForgetPassword