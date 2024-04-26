const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = 'bakangmonei2@gmail.com';
const gmailPassword = '';

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

  const {
    dateAndTime, examRoom, faculty, firstName, lastName, moduleLeaderEmail, moduleLeaderName,
    moduleName, phoneNumber, room, studentEmail, studentIDNumber, table, qrCodeImage,
  } = data;

  const mailOptions = {
    from: gmailEmail,
    to: studentEmail,
    subject: 'Your Exam Details',
    text: `Dear ${firstName} ${lastName},\n\nYour exam details are as follows:\n\nDate and Time: ${dateAndTime}\nExam Room: ${examRoom}\nFaculty: ${faculty}\nModule Name: ${moduleName}\n\nPlease find attached your QR code.\n\nBest regards,\n[Your Name]`,
    attachments: [
      {
        filename: 'qrCode.png',
        type: 'image/png',
        content: qrCodeImage,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    return { status: 'success' };
  } catch (error) {
    console.error(error);
    throw new functions.https.HttpsError('internal', 'Failed to send email.');
  }
});