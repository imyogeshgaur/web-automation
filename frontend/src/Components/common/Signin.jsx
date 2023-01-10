import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../../assets/NavBar'
import axios from "axios"
import { DECODE_USER_DEV, SIGIN_URL_DEV } from '../../constants/constant'
import "../../styles/Signin.css"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (token) {
      axios.post(DECODE_USER_DEV, "", {
        headers: {
          'authorization': token
        }
      })
        .then(res => {
            window.location.href = "/home"
        })
    }
  }, [])


  const signInUser = async () => {
    try {
      if (!email || !password) {
        const a = toast.error("Please Fill All Data !!!", {
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
        };
      } else {
        const response = await axios.post(SIGIN_URL_DEV, {
          email,
          password
        })
        const data = response.data;
        if (!data.token) {
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
        } else {
          localStorage.setItem("jwt", data.token)
          window.location.href = "/home"
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
          <h5 className="card-title text-light text-center">Login Here</h5>
          <div className="mb-3">
            <label className="form-label text-light">Email or UserName</label>
            <input type="email" className="form-control" placeholder="Enter your Email or UserName" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Password</label>
            <input type="password" className="form-control" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <button className="btn btn-primary w-50 mx-auto mb-4" onClick={signInUser}>Sign In</button>
        <Link style={{ color: "blue", cursor: "pointer", textDecoration: "none" }} className="mx-auto" to="/forgetPassword">Forget Password</Link>
        <p className='text-light text-center mt-2'>New To Meri Dukaan ?  <Link style={{ color: "blue", cursor: "pointer", textDecoration: "none" }} to="/signup">Sign Up Here</Link></p>
      </div>
      <ToastContainer autoClose={1000} />
    </>
  )
}

export default Signin