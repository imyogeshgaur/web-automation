
import { lazy } from "react";

const routes = [

    // Auth Routes
    { path: "/", element: <Signin /> },
    { path: "/signup", element: <Signup /> },
    { path: "/forgetPassword", element: <ForgetPassword /> },
    { path: "/resetPassword/:id", element: <ResetPassword /> },
    { path: "*", element: <NotFound /> },
    { path: "/unauthorized", element: <NotAuthorized /> },

    //Pdf Routes
    { path: "/home", element: <ShowProducts /> },
    { path: "/addPdf", element: <Add /> },

]

export default routes;