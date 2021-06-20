import nodemailer from "nodemailer";
import { Email } from "../../types/Email";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(email: Email, url: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  let message = {
    // Comma separated list of recipients
    to: `<${email}>`,

    // Subject of the message
    subject: "Nodemailer is unicode friendly ✔" + Date.now(),

    // plaintext body
    text: "Hello to myself!",

    // HTML body
    html: `<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>
        <p>Here's a nyan cat for you as an embedded attachment:<br/><img src="cid:${url}cidejdepj3u8y2ry9289"/></p><br/><a href="${url}">Confirm your email</a>`,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log("Error occurred");
      console.log(error.message);
      return process.exit(1);
    } else {
      console.log("Message sent successfully!");
      console.log(nodemailer.getTestMessageUrl(info));
    }

    return;
  });
}
