import { CheckCircle } from "lucide-react";
import React from "react";

const SuccessNotificationSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-[#FDF3DF] p-6 text-center">
      <CheckCircle className="text-[#A3CE8D]" size={64} />
      <h1 className="text-2xl font-semibold mt-4 text-[#333]">
        Verifikasi Berhasil
      </h1>
      <p className="mt-2 text-sm text-[#555] max-w-md">
        Email Anda telah berhasil diverifikasi. Anda sekarang dapat melanjutkan
        dan menikmati pengalaman berbelanja buah, sayur, dan rempah di Fruggy!
        🍋🍅🌶️
      </p>
    </section>
  );
};

export default SuccessNotificationSection;
