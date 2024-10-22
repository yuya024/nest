"use client";

import { Button } from "@/components/ui/button";
import { unlinkOauth } from "@/lib/actions/auth";
import { UserIdentity } from "@supabase/supabase-js";
import { toast } from "sonner";

export default function UnlinkEmail({
  userIdentities,
}: {
  userIdentities: UserIdentity[];
}) {
  const emailIdentity = userIdentities?.find(
    (identity) => identity.provider === "email"
  );

  const handleUnlinkEmail = async () => {
    const res = await unlinkOauth(emailIdentity as UserIdentity);
    toast(`連携解除に${res.success ? "成功" : "失敗"}しました`);
  };

  return (
    <div>
      <h3>メールアドレスの連携を解除</h3>
      <Button onClick={handleUnlinkEmail}>解除</Button>
    </div>
  );
}
