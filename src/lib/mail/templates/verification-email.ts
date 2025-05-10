export function generateVerificationEmail({
  fullName,
  verifyUrl,
}: {
  fullName: string;
  verifyUrl: string;
}) {
  const html = `
    <html>
      <body style="font-family: 'Segoe UI', sans-serif; background-color: #FDF3DF; padding: 0; margin: 0;">
        <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.05);">
          <!-- Header -->
          <div style="background-color: #A3CE8D; padding: 24px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff;">Welcome to Fruggy!</h1>
            <p style="color: #FDF3DF; font-size: 14px; margin: 8px 0 0;">
              Fresh Fruits. Vibrant Veggies. Authentic Spices.
            </p>
          </div>

          <!-- Body -->
          <div style="padding: 32px; background-color: #ffffff;">
            <p style="font-size: 16px; color: #333;">Hi <strong>${fullName}</strong>,</p>
            <p style="font-size: 16px; color: #333;">
              Thanks for signing up at <strong>Fruggy</strong> – your trusted source for fresh fruits, vegetables, and spices. 🍎🥬🌶️
            </p>
            <p style="font-size: 16px; color: #333;">
              To start shopping with confidence, please confirm your email by clicking the button below:
            </p>
            <div style="text-align: center; margin: 28px 0;">
              <a href="${verifyUrl}" style="padding: 14px 28px; background-color: #F8A058; color: white; font-size: 16px; border-radius: 6px; text-decoration: none;">
                Verify My Email
              </a>
            </div>
            <p style="font-size: 14px; color: #666;">
              This link will expire in 30 minutes. If you didn’t sign up, feel free to ignore this message.
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color: #FDD87C; padding: 20px; text-align: center; font-size: 12px; color: #555;">
            🍃 Powered by <strong style="color: #D6873E;">Fruggy</strong> | Bringing farm freshness to your doorstep.
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `Hi ${fullName},

Thanks for signing up at Fruggy – your trusted source for fresh fruits, vegetables, and spices!

Please confirm your email by clicking the link below:

${verifyUrl}

This link will expire in 30 minutes. If you didn’t sign up, you can ignore this message.

– Fruggy Team`;

  return { html, text };
}
