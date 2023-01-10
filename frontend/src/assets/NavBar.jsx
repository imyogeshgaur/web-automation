import { FiLogOut } from "react-icons/fi"
import { GoDiffAdded } from "react-icons/go"
import { AiOutlineUser } from "react-icons/ai"
import "../styles/NavBar.css"

const NavBar = (props) => {

    const logoutUser = () => {
        localStorage.clear("jwt")
        window.location.href = "/"
    }
    const addPdf = () => {
        window.location.href = "/addPdf"
    }
    const seeProfile = () => {
        window.location.href = "/home"
    }
    console.log(window.location.pathname)
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
                                <h5 className="text-light">{props.userName ? `Welcome ${props.userName}` : ""}</h5>
                            </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {props.userName && window.location.pathname === "/home" ?
                                <div className="d-inline-flex">
                                    <h3 onClick={addPdf}>
                                        <GoDiffAdded size={30} color={"white"} className='mx-2 mt-1' />
                                    </h3>
                                    <h3 onClick={logoutUser}>
                                        <FiLogOut size={30} color={"white"} className='mx-2 mt-1' />
                                    </h3>
                                </div>
                                :
                                <>

                                </>
                            }
                            {props.userName && window.location.pathname === "/addPdf" ?
                                <div className="d-inline-flex">
                                    <h3 onClick={seeProfile}>
                                        <AiOutlineUser size={30} color={"white"} className='mx-2 mt-1' />
                                    </h3>
                                    <h3 onClick={logoutUser}>
                                        <FiLogOut size={30} color={"white"} className='mx-2 mt-1' />
                                    </h3>
                                </div>
                                :
                                <>
                                </>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default NavBar