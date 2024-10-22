import { getUser } from "@/app/data/user";
import { redirect } from "next/navigation";

export const requireUser = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
};
