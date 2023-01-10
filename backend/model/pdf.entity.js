import { Sequelize, DataTypes } from "sequelize";
import * as path from "path"
import dotenv from "dotenv"
const localPath = path.resolve("../backend/.env")
dotenv.config({ path: localPath })
const sequelize = new Sequelize(process.env.DB_URI);


const Pdf = sequelize.define('PDf', {
    pdfId: {
        type: DataTypes.UUID,
        require: true,
    },
    pdfUrl: {
        type: DataTypes.STRING(500),
        require: true,
        unique: true,
        allowNull: false,
    },
    uploaded_by: {
        type: DataTypes.STRING,
    },
})

Pdf.sync({alter:true})

export default Pdf;