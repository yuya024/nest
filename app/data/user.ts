import { cache } from "react";
import { createClient } from "@/utils/supabase/server";

export const getUser = cache(async () => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return user;
});

export const getUserProvider = cache(async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUserIdentities();

  if (error) {
    console.log(error.message);
  }

  return data?.identities;
});
