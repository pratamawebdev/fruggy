import { Link } from "@/i18n/navigation";
import { TimerOff } from "lucide-react";
import React from "react";

const ExpiredNotificationSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-[#FDF3DF] p-6 text-center">
      <TimerOff className="text-[#F3934A]" size={64} />
      <h1 className="text-2xl font-semibold mt-4 text-[#333]">
        Tautan Kadaluarsa
      </h1>
      <p className="mt-2 text-sm text-[#555] max-w-md">
        Tautan verifikasi Anda sudah tidak berlaku. Silakan kirim ulang
        verifikasi untuk mendapatkan tautan terbaru.
      </p>
      <Link
        href="/auth/resend-verification"
        className="mt-4 inline-block px-4 py-2 bg-[#F8A058] text-white rounded-md hover:bg-[#F3934A] transition"
      >
        Kirim Ulang Verifikasi
      </Link>
    </section>
  );
};

export default ExpiredNotificationSection;
