import nodemailer from "nodemailer";
export const handleEmail = async (to, subject, text) => {
  try {
    const mailTransporter =  nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_MAIL_ADDRESS,
        pass: process.env.SENDER_MAIL_PASSWORD
      },
    });

    const mailOptions = {
      from: process.env.SENDER_MAIL_ADDRESS,
      to,
      subject,
      text,
    };

    const result = await mailTransporter.sendMail(mailOptions);
    return result.messageId;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
