const {sendmail} = require("../utils/sendmail");
const Contact = require("../models/ContactUs");
require("dotenv").config();

exports.sendemail = async (req, res) => {
  try {
  const { firstName, lastName, email, phone, message } = req.body;
  const Newemail=email.toLowerCase().trim();
    console.log("User email:", Newemail);
    console.log("Admin email:", process.env.ADMIN_EMAIL);
   
    const title = "Welcome to our platform";
    const body =
      "Thank you for registering with us. We are excited to have you on board and look forward to providing you with the best learning experience possible. If you have any questions or need assistance, please don't hesitate to reach out to our support team. Happy learning!";

   

    const db = await Contact.create({
      firstName,
      lastName,
      email: Newemail,
      phone,
      message,
    });

   if (!Newemail) {
     throw new Error("User email missing");
   }

       if (!process.env.ADMIN_EMAIL) {
         throw new Error("Admin email missing in env");
       }
    await sendmail(Newemail, title, body);



    await sendmail(
      process.env.ADMIN_EMAIL,
      "New Contact Form Submission",
      `
Name: ${firstName} ${lastName}
Email: ${Newemail}
Phone: ${phone}
Message: ${message}
      `,
    );

    return res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};