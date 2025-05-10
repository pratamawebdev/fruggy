import { getTranslations } from "next-intl/server";

export type TTranslation = Awaited<ReturnType<typeof getTranslations>>;

export type TApiResponseOptions<T = unknown> = {
  message: string;
  data?: T | null;
  status?: number;
  success?: boolean;
};

export type TSendMailOption = {
  to: string;
  subject: string;
  html?: string;
  text?: string;
};
