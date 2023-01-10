import Pdf from "../model/pdf.entity.js";
import decodeUser from "../helpers/decodeUser.js";
import AuthService from "./auth.service.js";
import * as path from "path"
import dotenv from "dotenv"
const localPath = path.resolve("../backend/.env")
dotenv.config({path:localPath})
import { v1 } from "uuid";


class PdfService {
    async uploadPdf(file, token) {
        try {
            const authService = new AuthService();
            const user = await authService.decodeUserByToken(token)
            const uploaded_by = user.userName;
            const pdfUrl = process.env.PDF_FILE_GET_URL + file;
            const id = v1();
            const pdf = await Pdf.create({
                pdfId: id,
                pdfUrl,
                uploaded_by
            });
            return pdf;
        } catch (error) {
            console.log("Pdf Service Error : ", error)
        }
    }

    async listPdf(){
        try {
            const pdfs = Pdf.findAll();
            return pdfs;
        } catch (error) {
            console.log("Pdf Service Error : ", error)
        }
    }
}


export default PdfService;