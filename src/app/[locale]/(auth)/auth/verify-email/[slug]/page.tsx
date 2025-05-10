import React from "react";
import SuccessNotificationSection from "./_components/sections/successNotification-section";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const Page = ({ params }: PageProps) => {
  const { locale, slug } = params;
  return <main>{slug === "success" && <SuccessNotificationSection />}</main>;
};

export default Page;
