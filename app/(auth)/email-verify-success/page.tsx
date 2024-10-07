import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

import NestLogo from "@/components/logo/nest-logo";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <NestLogo />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            メールアドレスの確認が完了しました。
            <br />
            ログインしてください。
          </CardTitle>
        </CardHeader>

        <CardFooter className="flex justify-center">
          <Link href="/login">ログインページへ</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
