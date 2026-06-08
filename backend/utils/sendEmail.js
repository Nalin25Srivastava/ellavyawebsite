import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  let transporter;

  // Use real SMTP if provided in .env
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    // Fallback to Ethereal Testing Account if .env is not set up
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, 
      auth: {
        user: testAccount.user, 
        pass: testAccount.pass, 
      },
    });
  }

  const fromEmail = process.env.EMAIL_USER || 'noreply@ellavya.com';

  // Define email options
  const mailOptions = {
    from: `"Ellavya Admin Auth" <${fromEmail}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `<p>${options.message}</p>`,
  };

  // Send the email
  const info = await transporter.sendMail(mailOptions);
  
  if (process.env.EMAIL_USER) {
    console.log('Real Email sent successfully: %s', info.messageId);
  } else {
    console.log('Test Email sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
};

export default sendEmail;
