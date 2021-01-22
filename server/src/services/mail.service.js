import nodemailer from "nodemailer"

export const sendConfirmLink = async(host, userId, userEmail, code) =>{
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const url = `${process.env.VERIFY_LINK_PROTOCOL}://${host}/${process.env.VERIFY_LINK_PAGE}/${userId}/${code}`
  let result = await transporter.sendMail({
    from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: `${process.env.EMAIL_SUBJECT}`,
    html: `<p>${process.env.EMAIL_TEXT} <a href="${url}">${url}</a></p>`,
  })
}