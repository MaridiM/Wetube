import nodemailer from 'nodemailer'
import smtp from './config'

export default (type, msg) => {
    const SMTP = type === 'google' 
        ? smtp.google
        : type === 'yahoo' 
            ? smtp.yahoo
            : type === 'outlook' && smtp.outlook
    const transporter = nodemailer.createTransport(SMTP)
    const info = transporter.sendMail(msg)
}
