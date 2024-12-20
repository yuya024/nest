"use client";

import { Provider, UserIdentity } from "@supabase/supabase-js";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { linkOauth, unlinkOauth } from "@/lib/actions/auth";
import { deleteCookie } from "@/lib/actions/cookie";

export default function LinkOauthButton({
  isAfterLinked,
  userIdentities,
}: {
  isAfterLinked: boolean;
  userIdentities: UserIdentity[];
}) {
  const googleLinked = userIdentities?.find(
    (identity) => identity.provider === "google"
  );
  const linkOauthButton = (oauth: Provider) => linkOauth(oauth);
  const unlinkOauthButton = async (oauth: UserIdentity) => {
    const res = await unlinkOauth(oauth);
    toast(`連携解除に${res.success ? "成功" : "失敗"}しました`);
  };

  useEffect(() => {
    if (isAfterLinked) {
      /**
       * 画面ロード直後だとトーストが動かないのでハック
       */
      setTimeout(() => {
        toast("連携に成功しました");
        deleteCookie("google-link-success");
      }, 300);
    }
  }, [isAfterLinked]);

  return (
    <>
      <h3>googleアカウントで連携</h3>
      {googleLinked ? (
        <Button onClick={() => unlinkOauthButton(googleLinked)}>
          googleアカウントの連携を解除
        </Button>
      ) : (
        <Button onClick={() => linkOauthButton("google")}>
          googleアカウントで連携
        </Button>
      )}
    </>
  );
}
