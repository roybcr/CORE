import nodemailer from "nodemailer";
import { Email } from "../../types/constants";

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

    // AMP4EMAIL
    amp: `<!doctype html>
        <html ⚡4email>
          <head>
            <meta charset="utf-8">
            <style amp4email-boilerplate>body{visibility:hidden}</style>
            <script async src="https://cdn.ampproject.org/v0.js"></script>
            <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
          </head>
          <body>
            <p><b>Hello</b> to myself <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
            <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/>
              <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
          </body>
        </html>`,

    // An array of attachments
    attachments: [
      // String attachment
      {
        filename: "notes.txt",
        content: "Some notes about this e-mail",
        contentType: "text/plain", // optional, would be detected from the filename
      },

      // Binary Buffer attachment
      {
        filename: "image.png",
        content: Buffer.from(
          "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/" +
            "//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U" +
            "g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC",
          "base64"
        ),

        cid: "note@example.com", // should be as unique as possible
      },

      // File Stream attachment
      {
        filename: "nyan cat ✔.gif",
        path: "src/utils/sendEmail/assets/nyan.gif",
        cid: `${url}cidejdepj3u8y2ry9289`, // should be as unique as possible
      },
    ],
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log("Error occurred");
      console.log(error.message);
      return process.exit(1);
    }

    console.log("Message sent successfully!");
    console.log(nodemailer.getTestMessageUrl(info));
    transporter.close();
  });
}
