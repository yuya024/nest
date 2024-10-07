"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const errorMessage: {
  [key: string]: string;
} = {
  user_already_exists: "ユーザーはすでに存在します",
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
    console.log(error.message);

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
