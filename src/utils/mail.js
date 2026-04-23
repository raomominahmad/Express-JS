import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme : "default",
    product:{
        name : "Task Manager",
        link: "https://taskmanagerlink.com"
    }
  })
  
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
  const emailHtml = mailGenerator.generate(options.mailgenContent)

  const transporter = nodemailer.createTransport({
    host : process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth : {
     user : process.env.MAILTRAP_SMTP_USER,
     pass : process.env.MAILTRAP_SMTP_PASS
    }
  })

  const mail = {
    from : "mail.taskmanager@example.com",
    to : options.email,
    subject : options.subject,
    text : emailTextual,
    html :  emailHtml
  }

  try{
    await transporter.sendMail(mail)
  }catch(error){
    console.error("Email service failed silently. Make sure you have provided your MAILTRAP credentials in .env file")
    console.error("Error: ",error)
  }
  
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App! we are excited to have you on board.",
      action: {
        instructions: "To get started with Basecampy, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your emails",
          link: verificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App! we are excited to have you on board.",
      action: {
        instructions:
          "To reset your password click on the following button or link",
        button: {
          color: "#0a56e2",
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

export { 
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail
 };
