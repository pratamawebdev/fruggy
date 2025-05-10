import { ApiResponse } from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!token) {
    return ApiResponse({
      message: "Verification link is invalid or missing.",
      status: 400,
    });
  }

  const user = await prisma.user.findUnique({
    where: { verificationToken: token },
  });

  if (!user) {
    return ApiResponse({
      message: "User not found.",
      status: 404,
    });
  }

  if (user.emailVerified) {
    return NextResponse.redirect(`${appUrl}/auth/verify-email/success`);
  }

  if (!user.verificationExpiresAt || user.verificationExpiresAt < new Date()) {
    return NextResponse.redirect(`${appUrl}/auth/verify-email/expired`);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verificationExpiresAt: null,
    },
  });

  return NextResponse.redirect(`${appUrl}/auth/verify-email/success`);
}
