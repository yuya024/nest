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

import { sendResetPasswordEmail } from "@/lib/actions/auth";
import { toast } from "sonner";
import { emailFormSchema } from "@/schema/email-password";

type FormData = z.infer<typeof emailFormSchema>;

export function EmailForm() {
  const form = useForm({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await sendResetPasswordEmail(data.email);
      toast.success(
        "パスワードリセットメールを送信しました。リンクをクリックして操作を完了してください。"
      );
    } catch (error) {
      toast.error("パスワードリセットメールの送信に失敗しました。");
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

        <Button className="w-full">送信</Button>
      </form>
    </Form>
  );
}
