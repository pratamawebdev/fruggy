import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Image from "next/image";

import AUTH_BACKGROUND from "@/assets/auth/images/auth-background-desktop.webp";
import FRUGGY_LOGO from "@/assets/logo/fruggy-logo.webp";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src={AUTH_BACKGROUND}
          fill
          alt="auth-background"
          className="object-cover"
        />
      </div>
      <div className="w-full max-w-sm relative">
        <div className="flex flex-col gap-4 items-center">
          <Image
            src={FRUGGY_LOGO}
            alt="fruggy-with-text-logo"
            className="aspect-[4/3] w-32 h-auto"
          />
          {children}
        </div>
      </div>
    </div>
  );
}
