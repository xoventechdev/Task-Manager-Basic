import nodemailer from "nodemailer";

// Function to configure email transporter (choose either Gmail or SMTP)
function getTransporter(options) {
  if (options.useGmail) {
    // Configure Gmail transporter with app password (more secure than less secure apps)
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // Use app password, not regular password
      },
    });
  } else {
    // Configure generic SMTP transporter
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE, // Use true for TLS, false for non-secure
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
}

// Function to send email verification email
export const sendVerificationEmail = async (email, otp) => {
  try {
    const transporter = getTransporter({
      useGmail: true,
    }); // Replace with your Gmail credentials and app password
    const mailOptions = {
      from: '"Your App Name" <noreply@yourapp.com>', // Replace with your app name and email
      to: email,
      subject: "Email Verification OTP",
      text: `Your verification code is ${otp}. This code is valid for 15 minutes. Please do not share this code with anyone.`,
    };

    await transporter.sendMail(mailOptions);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

// Function to send password reset email
export const sendPasswordResetEmail = async (email, otp) => {
  try {
    const transporter = getTransporter({
      useGmail: true,
    }); // Replace with your Gmail credentials and app password

    const mailOptions = {
      from: '"Task Manager Basic" <noreply@taskmanagerbasic.com>', // Replace with your app name and email
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset for your account. Your OTP code is ${otp}. Do not share this code with anyone.`,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const passwordResetSuccessfully = async (email) => {
  try {
    const transporter = getTransporter({
      useGmail: true,
    });
    const mailOptions = {
      from: '"Task Manager Basic" <noreply@taskmanagerbasic.com>', // Replace with your app name and email
      to: email,
      subject: "Password Reset Successful",
      text: `Your password has been reset successfully at ${formatDate()}. You can now log in with your new password.`,
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const formatDate = (date) => {
  date = new Date(date || Date.now());

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for single-digit days

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};
