import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const from = process.env.SMTP_FROM || process.env.EMAIL_FROM || user;

if (!host || !port || !user || !pass) {
  console.warn('SMTP configuration is incomplete. Forgot-password emails will log the URL in the server console.');
}

export const transporter = (host && port && user && pass)
  ? nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // Brevo uses 587 typically (STARTTLS)
      auth: { user, pass },
    })
  : null;

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  // Always log the URL in dev to make testing easy
  if (process.env.NODE_ENV !== 'production') {
    console.log('[DEV] Password reset URL:', resetUrl);
  }
  if (!transporter) {
    return { queued: false, logged: true };
  }
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject: 'Reset your CaptionCraft password',
      text: `We received a request to reset your password.\n\nOpen this link to choose a new password (valid for 1 hour):\n${resetUrl}\n\nIf you didn't request this, you can ignore this email.`,
      html: `
        <div style="font-family: Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif; color:#e6e6e6; background-color:#0b0b0b; padding:24px;">
          <h2 style="margin:0 0 12px 0; color:#ffffff;">Reset your password</h2>
          <p style="margin:0 0 16px 0; color:#b3b3b3;">We received a request to reset your password. Click the button below to choose a new password. This link is valid for 1 hour.</p>
          <p style="margin:24px 0;">
            <a href="${resetUrl}" style="display:inline-block; padding:10px 16px; background:#4f46e5; color:#ffffff; text-decoration:none; border-radius:8px;">Reset Password</a>
          </p>
          <p style="margin:0 0 8px 0; color:#b3b3b3;">Or copy and paste this URL into your browser:</p>
          <p style="word-break:break-all; color:#9ca3af;">${resetUrl}</p>
          <p style="margin-top:24px; color:#6b7280; font-size:12px;">If you didn't request this, you can ignore this email.</p>
        </div>
      `,
    });
    console.log('SMTP message queued. id:', info.messageId, 'response:', info.response);
    return { queued: true, messageId: info.messageId };
  } catch (err) {
    console.error('SMTP send failed:', err);
    // Still surface the URL in logs for manual testing
    return { queued: false, error: String(err) };
  }
}
