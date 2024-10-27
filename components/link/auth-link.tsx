import Link from "next/link";

export default function AuthLink({ type }: { type: "login" | "signup" }) {
  return (
    <>
      {type === "login" && (
        <>
          <p>
            <Link href="/signup" className="text-sm text-muted-foreground">
              アカウントをお持ちでない方はこちら
            </Link>
          </p>
          <p>
            <Link
              href="/reset-password"
              className="text-sm text-muted-foreground"
            >
              パスワードをお忘れの方
            </Link>
          </p>
        </>
      )}
      {type === "signup" && (
        <p>
          <Link href="/login" className="text-sm text-muted-foreground">
            アカウントをお持ちの方はこちら
          </Link>
        </p>
      )}
    </>
  );
}
