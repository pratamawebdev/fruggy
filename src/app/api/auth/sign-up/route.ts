import { signUpSchema } from "@/app/[locale]/(auth)/auth/lib/schema";
import { ApiResponse } from "@/lib/api.response";
import { sendMail } from "@/lib/mail";
import { generateVerificationEmail } from "@/lib/mail/templates/verification-email";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { addMinutes } from "date-fns";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const parsed = signUpSchema.safeParse(payload);
    if (!parsed.success) {
      return ApiResponse({
        message: "Validation failed",
        data: parsed.error.flatten().fieldErrors,
        status: 400,
      });
    }

    const { fullName, email, username, password } = parsed.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return ApiResponse({
        message: "Email or username is already registered.",
        data: null,
        status: 409,
      });
    }

    const hashedPassword = await hash(password, 10);
    const verificationExpiresAt = addMinutes(new Date(), 30);
    const verificationToken = randomBytes(32).toString("hex");
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        username,
        password: hashedPassword,
        verificationToken,
        verificationExpiresAt,
      },
    });

    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email?token=${verificationToken}`;

    const { html, text } = generateVerificationEmail({
      fullName: newUser.fullName,
      verifyUrl: verifyUrl,
    });

    await sendMail({
      to: newUser.email,
      subject: "Verify your email – Fruggy",
      html,
      text,
    });

    return ApiResponse({
      message:
        "Account created successfully. Please verify your email before logging in.",
      data: {
        id: newUser.id,
        email: newUser.email,
        emailVerified: false,
        verificationExpiresAt,
      },
      status: 201,
    });
  } catch (error) {
    console.error("SignUp error:", error);
    return ApiResponse({
      message: "Internal server error",
      data: error instanceof Error ? error.message : error,
      status: 500,
    });
  }
}
