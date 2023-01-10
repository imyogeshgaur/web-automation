import "../../styles/AddPdf.css"
import NavBar from '../../assets/NavBar'
import { useEffect, useState } from 'react'
import axios from "axios";
import { DECODE_USER_DEV,ADD_A_PDF } from '../../constants/constant'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AddPdf = () => {
  const [Data, setData] = useState("")
  const token = localStorage.getItem("jwt")
  const [file, setFile] = useState("")

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

const uploadPdf = async() =>{
    try {
        const formData = new FormData();
        formData.append("pdf",file);

        const res = await axios({
          baseURL:ADD_A_PDF,
          method:'POST',
          headers:{
            'Content-Type':'application/pdf',
            "authorization":token,
          },
          data:formData
        });
        const data = await res.data;
        if(data.pdfId){
          const a = toast.success("Pdf Uploaded !!!", {
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
              window.location.href="/home"
            }, 2000);
          }
        }else{
          const a = toast.error("Pdf Not Uploaded !!!", {
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
      <NavBar userName={Data.userName} />
      <div className="card mx-auto">
        <div className="card-body">
          <h5 className="card-title text-light text-center">Upload Pdf Here</h5>
          <div className="mb-3">
            <label className="form-label text-light">Upload Pdf</label>
            <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} />
          </div>
        </div>
        <button className="btn btn-primary w-50 mx-auto mb-3" onClick={uploadPdf}>Upload Pdf</button>
      </div>
      <ToastContainer autoClose={1000} />
    </>
  )
}

export default AddPdf