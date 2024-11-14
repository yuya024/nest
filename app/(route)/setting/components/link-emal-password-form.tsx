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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

import { mailPasswordFormSchema } from "@/schema/email-password";
import { linkByEmailPassword } from "@/lib/actions/auth";
import PasswordForm from "@/components/form/password-form";
import { MessageCircleQuestion } from "lucide-react";

type FormData = z.infer<typeof mailPasswordFormSchema>;

export function LinkEmailPasswordForm({}) {
  const form = useForm({
    resolver: zodResolver(mailPasswordFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    return linkByEmailPassword(data.email, data.password).then((result) => {
      if (result?.errorMessage) {
        toast.warning(result.errorMessage);
      }
      toast.info("メールを送信しました。ご確認ください。");
    });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <h3>メールアドレスで連携</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full p-0"
              >
                <MessageCircleQuestion className="h-4 w-4" />
                <span className="sr-only">ヘルプ</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                現在ログイン中のメールアドレスと入力したメールアドレスにメールが送信されるので両方のリンクを踏む必要があります。
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="w-96">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メールアドレス</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <PasswordForm
              form={form}
              name="password"
              autoComplete="new-password"
            />

            <Button className="w-full">連携する</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
