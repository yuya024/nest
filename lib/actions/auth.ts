"use server";

import { getUser } from "@/app/data/user";
import { createClient } from "@/utils/supabase/server";
import { Provider, UserIdentity } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const host =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_URL // 本番環境の URL
    : "http://localhost:3003";

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
      redirectTo: `${host}/api/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
};

export const linkOauth = async (provider: Provider) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.linkIdentity({
    provider,
    options: {
      redirectTo: `${host}/api/auth/callback?next=/setting`,
    },
  });

  if (error) {
    console.log(error.message);
  }

  if (data.url) {
    redirect(data.url);
  }

  return {
    success: true,
  };
};

export const unlinkOauth = async (provider: UserIdentity) => {
  const user = await getUser();
  if (!user) return { success: false };
  const supabase = createClient();

  if (provider.provider === "email") {
    const email = provider.identity_data?.email;
    if (!email) return { success: false };
    const { data, error } = await supabase.auth.updateUser({
      password: randomUUID(),
    });
    console.log(data);
    if (error) {
      console.log(error.message);
      return { success: false };
    }
  }

  const { data, error } = await supabase.auth.unlinkIdentity(provider);

  if (error) {
    console.log(error.message);
    return {
      success: false,
    };
  }

  revalidatePath("/setting");
  return {
    success: true,
  };
};

export const linkByEmailPassword = async (email: string, password: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.updateUser({
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

  return {
    success: true,
  };
};
