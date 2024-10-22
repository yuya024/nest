import { UserIdentity } from "@supabase/supabase-js";
import { getUserProvider } from "@/app/data/user";

/**
 * ユーザーが指定されたプロバイダーに連携しているかを返す
 * @param provider
 * @returns
 */
export const hasIdentity = async (provider: UserIdentity["provider"]) => {
  const userIdentities = await getUserProvider();
  const hasIdentity = userIdentities?.find(
    (identity) => identity.provider === provider
  );
  return Boolean(hasIdentity);
};
