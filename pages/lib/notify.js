import nodemailer from 'nodemailer';

export async function notifyAdmin(order, reason) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `Flagged COD Order: ${order.id}`,
    text: `Order ${order.id} was flagged for the following reason: ${reason}\n\nOrder details:\n${JSON.stringify(order, null, 2)}`,
  };

  await transporter.sendMail(mailOptions);
}