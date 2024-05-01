const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtps://bakangmonei2:btikrsvqtvzpayub@smtp.gmail.com:465',
  port: 587,
  secure: false, // or 'STARTTLS'
  auth: {
    user: 'bakangmonei2@gmail.com',
    pass: 'btikrsvqtvzpayub'
  }
});

exports.sendEmail = functions.https.onCall(async (data) => {
  const { to, subject, body, attachments } = data;
  const mailOptions = {
    from: 'bigDaddy',
    to,
    subject,
    text: body,
    attachments
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
});