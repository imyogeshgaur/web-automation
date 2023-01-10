import Pdf from "../model/pdf.entity.js";
import decodeUser from "../helpers/decodeUser.js";
import * as path from "path"
import dotenv from "dotenv"
const localPath = path.resolve("../backend/.env")
dotenv.config({path:localPath})
import { v1 } from "uuid";


class PdfService {
    async uploadPdf(file, token) {
        try {
            const decodedVal = decodeUser(token);
            const uploaded_by = decodedVal.payload.userId;
            const pdfUrl = process.env.PDF_FILE_GET_URL + file;
            const id = v1();
            const product = await Pdf.create({
                pdfId: id,
                pdfUrl,
                uploaded_by
            });
            return product;
        } catch (error) {
            console.log("Pdf Service Error : ", error)
        }
    }
}


export default PdfService;