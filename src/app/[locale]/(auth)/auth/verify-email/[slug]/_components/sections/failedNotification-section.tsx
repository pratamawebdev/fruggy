import { XCircle } from "lucide-react";
import React from "react";

const FailedNotificationSection = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FDF3DF] p-6 text-center">
      <XCircle className="text-red-500" size={64} />
      <h1 className="text-2xl font-semibold mt-4 text-[#333]">
        Verifikasi Gagal
      </h1>
      <p className="mt-2 text-sm text-[#555] max-w-md">
        Maaf, terjadi kesalahan saat memverifikasi email Anda. Pastikan Anda
        menggunakan tautan yang benar atau coba kirim ulang verifikasi.
      </p>
    </div>
  );
};

export default FailedNotificationSection;
