const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = 'bakangmonei2@gmail.com';
const gmailPassword = 'WatchmanInc@959115515';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendFormDetailsToEmail = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
  }

  const { name, email, message } = data;

  const mailOptions = {
    from: gmailEmail,
    to: gmailEmail,
    subject: 'New Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { status: 'success' };
  } catch (error) {
    console.error(error);
    throw new functions.https.HttpsError('internal', 'Failed to send email.');
  }
});