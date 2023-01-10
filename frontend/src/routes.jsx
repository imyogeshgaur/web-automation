import { lazy } from "react";

//? Common Routes
const Signin = lazy(() => import('./Components/common/Signin'));
const Signup = lazy(() => import('./Components/common/Signup'));
const NotFound = lazy(() => import('./Components/common/NotFound'));
const ForgetPassword = lazy(() => import('./Components/common/ForgetPassword'));
const ResetPassword = lazy(() => import('./Components/common/ResetPassword'));
const NotAuthorized = lazy(() => import("./Components/common/NotAuthorized"))

//? Pdf Routes
const AddPdf = lazy(() => import("./Components/screens/AddPdf"))
const Home = lazy(()=>import("./Components/screens/Home"))



const routes = [

    // Common Routes
    { path: "/", element: <Signin /> },
    { path: "/signup", element: <Signup /> },
    { path: "/forgetPassword", element: <ForgetPassword /> },
    { path: "/resetPassword/:id", element: <ResetPassword /> },
    { path: "*", element: <NotFound /> },
    { path: "/unauthorized", element: <NotAuthorized /> },

    // Pdf Routes
    { path: "/home", element: <Home /> },
    { path: "/addPdf", element: <AddPdf /> },
  
]

export default routes;