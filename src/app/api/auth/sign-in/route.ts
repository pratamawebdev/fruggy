import { ApiResponse } from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const { identifier, password } = payload;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return ApiResponse({
        message: "Identifier or password is incorrect",
        status: 401,
      });
    }

    if (!user.emailVerified) {
      return ApiResponse({
        message: "Your email has not been verified. Please check your inbox.",
        status: 403,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser }: Partial<User> = user;

    return ApiResponse({
      message: "Sign in successfully",
      data: safeUser,
    });
  } catch (error) {
    console.error("SignIn error:", error);
    return ApiResponse({
      message: "Sign in failed",
      data: error,
      status: 500,
    });
  }
}
