"use client";

import { SessionProvider as AuthSessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import React from "react";

interface ISessionProviderProps {
  children: React.ReactNode;
  session?: Session | null;
}

const SessionProvider = ({ children, session }: ISessionProviderProps) => {
  return (
    <AuthSessionProvider session={session}>{children}</AuthSessionProvider>
  );
};

export default SessionProvider;
