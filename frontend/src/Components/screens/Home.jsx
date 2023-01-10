import axios from 'axios'
import { useState, useEffect } from 'react'
import { ALL_PDFS, DECODE_USER_DEV } from '../../constants/constant'
import { GoDiffAdded } from "react-icons/go"
import { FiLogOut } from "react-icons/fi"
import "../../styles/Home.css"
const Home = () => {
  const [Data, setData] = useState("")
  const [value, setvalue] = useState([])
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
        setData(res.data)
      })
    }
  }, [])

  useEffect(() => {
    if (!token) {
      window.location.href = "/unauthorized"
    } else {
      axios.get(ALL_PDFS, {
        headers: {
          'authorization': token
        }
      })
        .then(res => {
          setvalue(res.data)
        })
    }
  }, [])


  const logoutUser = () => {
    localStorage.clear("jwt")
    window.location.href = "/"
  }

  const addPdf = () => {
    window.location.href = "/addPdf"
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <h3 className="text-light">Pdf Manager</h3>
              </li>
            </ul>
            <ul className="navbar-nav mx-auto ms-5">
              <li className="nav-item">
                <h5 className="text-light">{`Welcome ${Data.userName}`}</h5>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div className="d-inline-flex">
                <h3 onClick={addPdf}>
                  <GoDiffAdded size={30} color={"white"} className='mx-2 mt-1' />
                </h3>
                <h3 onClick={logoutUser}>
                  <FiLogOut size={30} color={"white"} className='mx-2 mt-1' />
                </h3>
              </div>
            </li>
          </ul>
        </div>
      </nav>
     {
        value.length ===0 ? <h1 className="text-center">No Pdf Found !!!</h1>
        : 
        <div className='container tb1-container mt-3' style={{ maxWidth: "90%" }}>
        <div className="row tb1-fixed">
          <table className={Data.length !== 0 ? "table-striped table-condensed" : "table-striped table-condensed hidden"}>
            <thead>
              <tr>
                <th scope="col">View PDF</th>
                <th scope='col'>Uploaded By</th>
                <th scope="col">Uploaded At</th>
                <th scope="col">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {
                value.map(val => {
                  return (
                    <tr key={val.pdfId}>
                      <td><a href={val.pdfUrl} target="_blank">View Pdf</a></td>
                      <td>{val.uploaded_by}</td>
                      <td>{val.createdAt}</td>
                      <td>{val.updatedAt}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
     }
    </>
  )
}

export default Home