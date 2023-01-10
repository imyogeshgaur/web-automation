import nodemailer from "nodemailer";
import * as path from "path"
import dotenv from "dotenv"
const localPath = path.resolve("../backend/.env")
dotenv.config({ path: localPath })

const passwordResetMail = async (recieverMail, subjectOfMail, contentOfMail) => {
    const mailOptions = {
        from: process.env.MAILID,
        to: recieverMail,
        subject: subjectOfMail,
        html: contentOfMail,
    }
    try {
        const passwordResetTransport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: process.env.MAILID,
                pass: process.env.MAILPASS
            }
        })
        passwordResetTransport.sendMail(mailOptions, function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent !!!');
            }
        });
    } catch (error) {
        console.log("Password Reset Mail's Helper Error : ", error)
    }
}

export { passwordResetMail };