import nodemailer from "nodemailer";
import { signupMail } from './signupMail.js';
import * as aws from "@aws-sdk/client-ses";
// So we can use .env variables locally import dotenv
import * as dotenv from 'dotenv';
dotenv.config();
const ses = new aws.SES({
    apiVersion: "2010-12-01",
    region: process.env.SES_REGION,
    credentials: {
        accessKeyId: process.env.SES_ACCESSKEY,
        secretAccessKey: process.env.SES_SECRETKEY,
    },
});
// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
    SES: { ses, aws },
});
export const sendMail = (to, url) => {
    // send mail
    transporter.sendMail(
    // mail options
    {
        from: "wisdomochiche@gmail.com",
        to: to,
        subject: "Verification Mail",
        html: signupMail(url),
    }, 
    // callback
    (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        }
        else {
            console.log('Email sent:', info.messageId);
        }
    });
};
