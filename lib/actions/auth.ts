"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const host =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_URL // 本番環境の URL
    : "http://localhost:3000";

const errorMessage: {
  [key: string]: string;
} = {
  user_already_exists: "ユーザーはすでに存在します",
};

export const signOut = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error.message);
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (!error) {
    redirect("/signup/success");
  }

  return {
    errorMessage: error?.code && (errorMessage[error?.code] || error?.code),
  };
};

export const signInWithEmail = async (email: string, password: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const messages: {
      [key: string]: string;
    } = {
      "Email not confirmed": "メールアドレスが確認されていません",
      "Invalid login credentials": "メールアドレスまたはパスワードが違います",
    };

    return {
      errorMessage: error.message && messages[error.message],
    };
  }

  redirect("/");
};

export const signInWithGoogle = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `${host}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
};
