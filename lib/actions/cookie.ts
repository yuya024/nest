"use server";

import { cookies } from "next/headers";

export const deleteCookie = async (cookieName: string) => {
  (await cookies()).delete(cookieName);
};
