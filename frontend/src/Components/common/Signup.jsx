import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import NavBar from '../../assets/NavBar'
import "../../styles/Signup.css"
import { SIGNUP_URL_DEV } from '../../constants/constant';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  const userSignUp = async () => {
    try {
      if (!email || !password || !userName || !role) {
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
          const response = await axios.post(SIGNUP_URL_DEV, {
            userName,
            email,
            password,
            role
          })
          const data = await response.data;
          if (data.message === "Email Already Exist !!!" || data.message === "User Name Already Exist !!!") {
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
                window.location.href="/"
              }, 2000);
            }
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
          <h5 className="card-title text-light text-center">Sign Up Here</h5>
          <div className="mb-3">
            <label className="form-label text-light">Enter User Name</label>
            <input type="email" className="form-control" id="formGroupExampleInput" placeholder="Enter your Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Enter Email</label>
            <input type="email" className="form-control" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Enter Password</label>
            <input type="password" className="form-control" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Role</label>
            <select className="form-select" aria-label="Default select example"
              value={role} onChange={(e) => setRole(e.target.value)}
            >
              <option></option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary w-50 mx-auto mb-2" onClick={userSignUp}>Sign Up</button>
        <p className='text-light text-center'>Already Rgistered ? <Link style={{ color: "blue", cursor: "pointer", textDecoration: "none" }} className="fw-bold" to="/">Login Here</Link></p>
      </div>
      <ToastContainer autoClose={1000} />
    </>
  )
}

export default Signup