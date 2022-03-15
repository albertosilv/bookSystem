import SMTPTransport from 'nodemailer/lib/smtp-transport'

interface IMailConfig {
  driver: 'smtp' | 'fake'

  config: {
    smtp: SMTPTransport.Options
    fake: object
  }
}

const setBoolean = (value: any) => {
  try {
    return !(Number(value) > 1)
  } catch (error) {
    return false
  }
}

export const mailConfig = Object.freeze({
  driver: process.env.MAIL_DRIVER || 'fake',
  config: {
    smtp: {
      host: process.env.MAIL_SMTP_HOST,
      port: Number(process.env.MAIL_SMTP_PORT),
      ssl: setBoolean(process.env.MAIL_SMTP_SSL),
      tls: setBoolean(process.env.MAIL_SMTP_TLS),
      auth: {
        user: process.env.MAIL_SMTP_USERNAME,
        pass: process.env.MAIL_SMTP_PASSWORD
      }
    },
    fake: {}
  }
}) as IMailConfig
