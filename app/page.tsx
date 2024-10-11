import { redirect } from "next/navigation";
import { getUser } from "./data/user";
import { signOut } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Nest</h1>
      <p>メールアドレス: {user.email}</p>
      <form action={signOut}>
        <Button type="submit">ログアウト</Button>
      </form>
    </div>
  );
}
