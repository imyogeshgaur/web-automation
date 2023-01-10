import PdfService from "../services/pdf.service.js";

class PdfController {
    constructor() {
        this.pdfService = new PdfService()
    }

    async uploadPdf(req, res) {
        try {
            const file = req.file?.filename;
            const token = req.headers.authorization;
            const uploadedPdf = await this.pdfService.uploadPdf(file, token);
            return res.status(200).send(uploadedPdf)
        } catch (error) {
            console.log(error)
            return res.status(500).send("Auth Controller : Internal Server Error !!!")
        }
    }

    async downloadPdf(req, res) {
        try { 
            const file = req.file?.filename;
            return res.download(`../../staff-aug/backend/src/data/resume/${file}`)
        } catch (error) {
            console.log(error)
            return res.status(500).send("Auth Controller : Internal Server Error !!!")
        }
    }

    async listPdf(req,res){
        try {
            const pdfData = await this.pdfService.listPdf();
            return res.status(200).send(pdfData)
        } catch (error) {
            console.log(error)
            return res.status(500).send("Auth Controller : Internal Server Error !!!")
        }
    }
}


export default PdfController;