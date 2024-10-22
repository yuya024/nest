import { cookies } from "next/headers";
import { UserIdentity } from "@supabase/supabase-js";

import LinkOauthButton from "./components/link-oauth-button";
import { LinkEmailPasswordForm } from "./components/link-emal-password-form";
import { hasIdentity } from "@/lib/has-identity";
import { requireUser } from "@/lib/auth";
import { getUserProvider } from "@/app/data/user";
import UnlinkEmail from "./components/unlink-email";

export default async function page() {
  await requireUser();

  const isAfterLinked = cookies().get("google-link-success")?.value;
  const userIdentities = await getUserProvider();
  const emailLinked = await hasIdentity("email");
  const googleLinked = await hasIdentity("google");

  return (
    <div>
      <h2>アカウント連携</h2>
      <LinkOauthButton
        isAfterLinked={Boolean(isAfterLinked)}
        userIdentities={userIdentities as UserIdentity[]}
      />

      {googleLinked && !emailLinked && <LinkEmailPasswordForm />}

      {googleLinked && emailLinked && (
        <UnlinkEmail userIdentities={userIdentities as UserIdentity[]} />
      )}
    </div>
  );
}
