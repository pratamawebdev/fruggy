import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import SessionProvider from "@/providers/session-provider";
import { ReduxProvider } from "@/providers/redux-provider";

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
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <SessionProvider>
              <NextIntlClientProvider>
                {children}
                <Toaster />
              </NextIntlClientProvider>
            </SessionProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
