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
