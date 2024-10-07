import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
            確認メールを送信しました
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            メールのリンクをクリックして登録を完了してください。
            <br />
            メールが届かない場合は、迷惑メールフォルダをご確認ください。
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/">トップに戻る</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
