const nodemailer=require('nodemailer');


require('dotenv').config();



const sendmail=async(email,title,body)=>{

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: title,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#fff; border-radius:8px; overflow:hidden;">
                    <tr>
                      <td style="background:#ffcc00; padding:20px; text-align:center; font-size:24px; font-weight:bold; color:#000;">
                        Your Company
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:30px; color:#333; font-size:16px; line-height:1.5;">
                        <p><strong>Hello,</strong></p>
                        <p>${body}</p>
                        <p>Regards,<br/>The Team</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="background:#eee; padding:15px; text-align:center; font-size:12px; color:#666;">
                        © 2026 Your Company. All rights reserved.<br/>
                        <a href="https://yourcompany.com" style="color:#000; text-decoration:none;">Visit our website</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });
    console.log("mail send successfully" + info.response);

    return info;
  } catch (err) {
    console.log("error" + err);
  }
}
module.exports={sendmail};