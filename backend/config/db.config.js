import { Sequelize } from "sequelize";
import * as path from "path"
import dotenv from "dotenv"
const localPath = path.resolve("../backend/.env")
dotenv.config({path:localPath})

const connectionConfig = new Sequelize(process.env.DB_URI)

const connectToDB = async()=>{
    try {
        await connectionConfig.authenticate();
    } catch (error) {
        console.log(error)
    }
}

export default connectToDB