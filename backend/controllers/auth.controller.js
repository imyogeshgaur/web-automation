import AuthService from "../services/auth.service.js";
import { signInUserContoller } from "../helpers/signinUser.js";

class AuthController {
    constructor() {
        this.authService = new AuthService()
    }

    async signUpUser(req, res) {
        try {
            const body = req.body;
            const user = await this.authService.signUpUser(body);
            if (user === 0) {
                return res.status(200).send({message:"Email Already Exist !!!"});
            } else if(user===1){
                return res.status(200).send({message:"User Name Already Exist !!!"});
            }
            else {
                return res.status(200).send({message:"User Created !!!"});
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send("Auth Controller : Internal Server Error !!!")
        }
    }
    async signInUser(req, res) {
        try {
            const email = req.body.email
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                const value = await this.authService.signInUserByEmail(req.body);
                const data = await signInUserContoller(res, value);
                return data;
            } else {
                const value = await this.authService.signInUserByUserName(req.body);
                const data = await signInUserContoller(res, value);
                return data;
            }

        } catch (error) {
            console.log(error)
            return res.status(500).send("Auth Controller : Internal Server Error !!!")
        }
    }

    async forgetPassword(req, res) {
        try {
            const email = req.body.email;
            const data = await this.authService.mailTheUser(email);
            if (!data) {
                return res.status(200).send({ message: "Reset Link Shared in your Registerd Mail !!!" })
            } else {
                return res.status(200).send({ message: data })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send("Auth Controller : Internal Server Error !!!")
        }
    }
    async resetPassword(req, res) {
        try {
            const userId = req.params.id;
            const password = req.body.password;
            const data = await this.authService.resetPassword(userId, password);
            return res.status(200).send({ message: data })
        } catch (error) {
            console.log(error)
            return res.status(500).send("Auth Controller : Internal Server Error !!!")
        }
    }
    async decodeUserByToken(req, res) {
        try {
            const token = req.headers.authorization;
            const user = await this.authService.decodeUserByToken(token);
            return res.status(200).send(user);
        } catch (error) {
            console.log(error)
            return res.status(500).send("Auth Controller : Internal Server Error !!!")
        }
    }
}

export default AuthController