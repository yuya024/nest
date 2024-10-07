import { redirect } from "next/navigation";
import { getUser } from "./data/user";

export default async function Home() {
  const user = await getUser();
  console.log(user);

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Nest</h1>
      <p>メールアドレス: {user.email}</p>
    </div>
  );
}
