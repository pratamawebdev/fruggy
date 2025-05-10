"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { signUpSchema } from "../../lib/schema";

const SignUpForm = () => {
  const t = useTranslations("MODULE.AUTH-MODULE.SIGN-UP-PAGE");
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
    try {
      const user = await signIn("credentials", {
        identifier: data.identifier,
        password: data.password,
        callbackUrl: searchParams.get("callbackUrl") || "/dashboard",
        redirect: false,
      });

      if (!user?.error) {
        router.push(user?.url || "/");
      } else {
        toast(user.error);
        console.log(user.error);
      }
      console.log(user);
    } catch (error) {}
    console.log(data);
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("FORM.FIELD.FIELD-1.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("FORM.FIELD.FIELD-1.placeholder")}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("FORM.FIELD.FIELD-1.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("FORM.FIELD.FIELD-1.placeholder")}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("FORM.FIELD.FIELD-1.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("FORM.FIELD.FIELD-1.placeholder")}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("FORM.FIELD.FIELD-2.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("FORM.FIELD.FIELD-2.placeholder")}
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("FORM.FIELD.FIELD-2.label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("FORM.FIELD.FIELD-2.placeholder")}
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {t("FORM.BUTTON.button-1")}
              </Button>
              <Button variant="outline" className="w-full">
                {t("FORM.BUTTON.button-2")}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
