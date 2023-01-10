import { Router } from "express"
import PdfController from "../controllers/pdf.controller.js";
import authorization from "../middleware/authorization.js";
import { uploadPdf } from "../middleware/upload.js";
const pdfRouter = Router();


pdfRouter.post("/uploadPdf",[authorization,uploadPdf], async (req, res) => {
    try {
        const pdfController = new PdfController();
        pdfController.uploadPdf(req,res);
    } catch (error) {
        console.log("Pdf Global Error : ", error)
    }
})

pdfRouter.get("/downloadPdf",authorization, async (req, res) => {
    try {
        const pdfController = new PdfController();
        pdfController.downloadPdf(req,res);
    } catch (error) {
        console.log("Pdf Global Error : ", error)
    }
})

pdfRouter.get("/list",authorization, async (req, res) => {
    try {
        const pdfController = new PdfController();
        pdfController.listPdf(req,res);
    } catch (error) {
        console.log("Pdf Global Error : ", error)
    }
})


export default pdfRouter;
