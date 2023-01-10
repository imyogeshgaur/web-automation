import {Router} from "express"
import AuthController from "../controllers/auth.controller.js";
const authRouter =  Router();

authRouter.post("/signup",async(req,res)=>{
    try {
       const authController = new AuthController();
       await authController.signUpUser(req,res); 
    } catch (error) {
        console.log("Auth Global Error : ",error)
    }
})

authRouter.post("/signin",async(req,res)=>{
    try {
        const authController = new AuthController();
        await authController.signInUser(req,res); 
     } catch (error) {
         console.log("Auth Global Error : ",error)
     }
})

authRouter.post("/forgetPassword",async(req,res)=>{
    try {
        const authController = new AuthController();
        authController.forgetPassword(req,res); 
    } catch (error) {
        console.log("Auth Global Error : ",error)
    }
})

authRouter.post("/resetPassword/:id",async(req,res)=>{
    try {
        const authController = new AuthController();
        authController.resetPassword(req,res);
    } catch (error) {
        console.log("Auth Global Error : ",error)
    }
})
authRouter.post("/decodeUser",async(req,res)=>{
    try {
        const authController = new AuthController();
        authController.decodeUserByToken(req,res);
    } catch (error) {
        console.log("Auth Global Error : ",error)
    }
})


export default authRouter;