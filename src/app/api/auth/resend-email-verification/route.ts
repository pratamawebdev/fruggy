import { ApiResponse } from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";
import { generateVerificationEmail } from "@/lib/mail/templates/verification-email";
import { addMinutes } from "date-fns";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return ApiResponse({
        message: "Email is required",
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return ApiResponse({
        message: "User not found",
        status: 404,
      });
    }

    if (user.emailVerified) {
      return ApiResponse({
        message: "Email is already verified",
        status: 200,
      });
    }

    const verificationExpiresAt = addMinutes(new Date(), 30);
    const verificationToken = randomBytes(32).toString("hex");
    await prisma.user.update({
      where: { id: user.id },
      data: { verificationToken, verificationExpiresAt },
    });

    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email?token=${verificationToken}`;
    const { html, text } = generateVerificationEmail({
      fullName: user.fullName,
      verifyUrl,
    });

    await sendMail({
      to: user.email,
      subject: "Resend Email Verification – Fruggy",
      html,
      text,
    });

    return ApiResponse({
      message: "Verification email sent successfully.",
      status: 200,
    });
  } catch (error) {
    console.error("Resend verification error:", error);
    return ApiResponse({
      message: "Internal server error",
      data: error instanceof Error ? error.message : error,
      status: 500,
    });
  }
}
