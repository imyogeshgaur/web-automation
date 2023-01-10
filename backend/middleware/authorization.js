import jwt from "jsonwebtoken";
import * as path from "path"
import dotenv from "dotenv"
const localPath = path.resolve("../backend/.env")
dotenv.config({path:localPath})

const authorization = (req,res,next)=>{
    try {
        const token = req.headers.authorization;
        const validToken = jwt.verify(token,process.env.SECRET);
        if(!validToken){
            return res.status(401).send({message:"Not Authorized !!!"})
        }else{
            next();
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send("Authoriztion Error !!!");
    }
}

export default authorization;