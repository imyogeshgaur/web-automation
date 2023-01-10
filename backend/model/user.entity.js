import { Sequelize, DataTypes } from "sequelize";
import * as path from "path"
import dotenv from "dotenv"
const localPath = path.resolve("../backend/.env")
dotenv.config({ path: localPath })
const sequelize = new Sequelize(process.env.DB_URI);


const User = sequelize.define('User', {
    userId: {
        type: DataTypes.UUID,
        require: true,
    },
    userName: {
        type: DataTypes.STRING,
        require: true,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        require: true,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        require: true
    },
    role: {
        type: DataTypes.STRING,
        require: true
    },
})

User.sync()

export default User;