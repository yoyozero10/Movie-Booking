import nodemailer from 'nodemailer';

// Store the test account so we don't recreate it on every email
let testAccount = null;

// Create flexible transporter that works with fake (Ethereal) and real SMTP
const createTransporter = async () => {
  // If user provided custom SMTP credentials, use them
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Fallback to Ethereal auto-generated test account
  if (!testAccount) {
    testAccount = await nodemailer.createTestAccount();
  }

  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
  const transporter = await createTransporter();

  const mailOptions = {
    from: process.env.SMTP_FROM || '"CinemaVision Pro" <noreply@cinemavision.com>',
    to: email,
    subject: 'Password Reset Request - CinemaVision Pro',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <div style="background-color: #0f172a; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: #fff; margin: 0; font-size: 24px;">CinemaVision Pro</h1>
        </div>
        <div style="border: 1px solid #e2e8f0; border-top: none; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #0f172a; margin-top: 0;">Khôi phục mật khẩu</h2>
          <p>Chào bạn,</p>
          <p>Chúng tôi đã nhận được yêu cầu khôi phục mật khẩu cho tài khoản liên kết với thẻ email này.</p>
          <p>Vui lòng click vào nút bên dưới để đặt lại mật khẩu mới. Liên kết này sẽ hết hạn sau 1 giờ.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Đổi Mật Khẩu Mới</a>
          </div>
          <p style="color: #64748b; font-size: 14px;">Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này. Mật khẩu của bạn vẫn an toàn.</p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent: %s', info.messageId);

    // Suggest preview URL if using Ethereal MTA
    if (process.env.SMTP_HOST === 'smtp.ethereal.email' || !process.env.SMTP_HOST) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
