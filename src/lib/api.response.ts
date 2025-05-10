import { TApiResponseOptions } from "@/types";
import { NextResponse } from "next/server";

export function ApiResponse<T = unknown>({
  message,
  data = null,
  status = 200,
  success,
}: TApiResponseOptions<T>) {
  const isSuccess =
    typeof success === "boolean" ? success : status >= 200 && status < 300;

  return NextResponse.json(
    {
      success: isSuccess,
      message,
      data,
    },
    { status }
  );
}
