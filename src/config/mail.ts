/* eslint-disable @typescript-eslint/explicit-function-return-type */
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: process.env.SERVICE_EMAIL,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})
