"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import PasswordForm from "@/components/form/password-form";
import { updatePassword } from "@/lib/actions/auth";
import { passwordFormSchema } from "@/schema/email-password";
import { useRouter } from "next/navigation";

export default function UpdatePasswordForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      password: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof passwordFormSchema>) => {
    try {
      await updatePassword(data.password);
      toast.success("パスワードの変更が完了しました。");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("パスワードの変更に失敗しました。");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <PasswordForm form={form} name="password" autoComplete="new-password" />

        <Button className="w-full" disabled={!isValid || isSubmitting}>
          変更
        </Button>
      </form>
    </Form>
  );
}
