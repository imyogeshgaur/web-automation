import multer from "multer"
import path from "path";
import dotenv from "dotenv"
const localPath = path.resolve("../backend/.env")
dotenv.config({ path: localPath })
import { v1 } from 'uuid';

const tempPdfStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        const pathToFolder = path.resolve(process.env.PDF_UPLOAD_FOLDER)
        callback(null, pathToFolder);
    },
    filename: function (req, file, callback) {
        callback(null, v1() + Date.now() + path.extname(file.originalname))
    }
});

export const uploadPdf = multer({ storage: tempPdfStorage }).single("pdf");
