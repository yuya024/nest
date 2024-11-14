import { cookies } from "next/headers";
import LinkOauthButton from "./components/link-oauth-button";
import { LinkEmailPasswordForm } from "./components/link-emal-password-form";
import { hasIdentity } from "@/lib/has-identity";
import { requireUser } from "@/lib/auth";
import { getUserProvider } from "@/app/data/user";
import UnlinkEmail from "./components/unlink-email";

export default async function page() {
  await requireUser();

  const isAfterLinked = Boolean(
    (await cookies()).get("google-link-success")?.value
  );
  const userIdentities = await getUserProvider();
  const googleLinked = await hasIdentity("google");
  const emailIdentity = userIdentities?.find(
    (identity) => identity.provider === "email"
  );

  return (
    <div>
      <h2>アカウント連携</h2>
      {emailIdentity && userIdentities && (
        <LinkOauthButton
          isAfterLinked={isAfterLinked}
          userIdentities={userIdentities}
        />
      )}

      {googleLinked && !emailIdentity && <LinkEmailPasswordForm />}

      {googleLinked && emailIdentity && userIdentities && (
        <UnlinkEmail emailIdentity={emailIdentity} />
      )}
    </div>
  );
}
