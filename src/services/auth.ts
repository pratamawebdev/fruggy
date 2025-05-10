/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signUp: builder.mutation<any, any>({
      query: (body) => ({
        url: "/sign-up",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignUpMutation } = authApi;
