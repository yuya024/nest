import Link from "next/link";
import HyperText from "@/components/ui/hyper-text";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { EmailPasswordForm } from "@/components/form/email-password-form";
import { GoogleIcon } from "@/components/svg/google";
import NestLogo from "@/components/logo/nest-logo";

export default function SignupPage() {
  return (
    <div>
      <div className="flex min-h-screen bg-gray-100">
        <div className="hidden md:flex md:w-1/2 items-center justify-center space-x-6">
          <NestLogo />
          <div className="flex flex-col items-center space-y-4">
            <HyperText
              text="Next Era Swim Tracker"
              className="text-4xl font-bold text-blue-400 border-b-2 border-blue-400"
              duration={2000}
            />
            <div className="text-md text-muted-foreground">
              練習メニューを記録、管理してみては？
            </div>
            <ul className="text-sm text-muted-foreground space-y-2 mb-8 mt-4">
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                あなただけの練習メニューを作成
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                練習メニューを記録、管理する
              </li>
              <li className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                メニューを販売する
              </li>
            </ul>
          </div>
        </div>

        <div className="flex w-full md:w-1/2 items-center justify-center bg-white">
          <Card className="w-full md:w-3/5 bg-white shadow-none border-none">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                アカウント作成
              </CardTitle>
              <CardDescription className="text-center">
                NESTへようこそ
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4">
              <Button
                variant="outline"
                className="w-full"
                // onClick={handleGoogleLogin}
              >
                <GoogleIcon />
                Googleでログイン
              </Button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    または
                  </span>
                </div>
              </div>
              <EmailPasswordForm mode="signup" />
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-2">
              <Link href="/login">ログインページへ</Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}