"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

import { mailPasswordFormSchema } from "@/schema/email-password";
import PasswordForm from "./password-form";
import { signInWithEmail, signUpWithEmail } from "@/lib/actions/auth";

type FormData = z.infer<typeof mailPasswordFormSchema>;

export function EmailPasswordForm({ mode }: { mode: "login" | "signup" }) {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(mailPasswordFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (mode === "login") {
      return signInWithEmail(data.email, data.password).then((result) => {
        if (result?.errorMessage) {
          toast({
            title: result.errorMessage,
            variant: "destructive",
          });
        }
      });
    } else {
      return signUpWithEmail(data.email, data.password).then((result) => {
        if (result?.errorMessage) {
          toast({
            title: result.errorMessage,
            variant: "destructive",
          });
        }
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input type="email" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <PasswordForm
          form={form}
          name="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
        />

        <Button className="w-full">
          {mode === "login" ? "ログイン" : "新規登録"}
        </Button>
      </form>
    </Form>
  );
}
