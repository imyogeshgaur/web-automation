import express, { urlencoded } from "express";
import connectToDB from "./config/db.config.js";
import authRouter from "./routes/auth.routes.js";
import pdfRouter from "./routes/pdf.routes.js";
import cors from "cors"
import * as path from "path";
const app = express();

app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use("/pdf",pdfRouter)
app.use("/auth",authRouter)

app.use("/static/pdf",express.static(path.join(process.cwd(),"./uploads")))

connectToDB();

app.listen(4000)
