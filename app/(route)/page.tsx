import { redirect } from "next/navigation";
import { getUser } from "../data/user";
import Link from "next/link";

export default async function Home() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p>メールアドレス: {user.email}</p>

      <Link href="/menu-template">メニューテンプレートを作成</Link>
    </div>
  );
}
