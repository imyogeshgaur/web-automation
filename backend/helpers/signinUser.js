import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import * as path from "path"
import dotenv from "dotenv"
const localPath = path.resolve("../backend/.env")
dotenv.config({path:localPath})

const signInUserService = async (userData, password) => {
    try {
        if (userData) {
            const match = await bcryptjs.compare(password, userData.password);
            if (match) {
                const token = jwt.sign({ userId: userData.userId }, process.env.SECRET)
                return token;
            } else {
                return 1;
            }
        } else {
            return 0;
        }
    } catch (error) {
        console.log("Sign In Service's Helper  Error : ", error)
    }
}

const signInUserContoller = async (res, value) => {
    try {
        if (value === 0) {
            return res.status(200).send({ message: "Invalid Credentials !!!" })
        } else if (value === 1) {
            return res.status(200).send({ message: "Invalid Credentials !!!" })
        } else {
            return res.status(200).send({ token: value });
        }
    } catch (error) {
        console.log("Sign In Controller's Helper  Error : ", error)
    }
}

export { signInUserService, signInUserContoller };