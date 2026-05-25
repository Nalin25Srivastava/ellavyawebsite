import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // Create a test account dynamically for Ethereal Email
  const testAccount = await nodemailer.createTestAccount();

  // Create a transporter object using Ethereal's SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // Define email options
  const mailOptions = {
    from: '"Ellavya Admin Auth" <noreply@ellavya.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `<p>${options.message}</p>`,
  };

  // Send the email
  const info = await transporter.sendMail(mailOptions);
  
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

export default sendEmail;
