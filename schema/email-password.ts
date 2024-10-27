import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, {
    message: "最小8文字以上です。",
  })
  .refine(
    (password) =>
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/.test(
        password
      ),
    {
      message:
        "大文字、小文字、数字、特殊文字をそれぞれ1つ以上含む8文字以上のパスワードを入力してください。",
    }
  );

export const mailPasswordFormSchema = z.object({
  email: z.string().email({
    message: "有効なメールアドレスを入力してください。",
  }),
  password: passwordSchema,
});

export const passwordFormSchema = z.object({
  password: passwordSchema,
});

export const emailFormSchema = z.object({
  email: z.string().email({
    message: "有効なメールアドレスを入力してください。",
  }),
});
