import { User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/terms"];
const guestRoutes = [
  "/login",
  "/signup",
  "/email-verify-success",
  "/reset-password",
];

export default async function AppMiddleware(
  request: NextRequest,
  response: NextResponse,
  user: User | null
) {
  const path = request.nextUrl.pathname;
  const signedIn = Boolean(user);
  const isPublicRoutes = publicRoutes.includes(path);
  const isGuestRoute = guestRoutes.find((route) => path.startsWith(route));
  const isPrivateRoute = !isPublicRoutes && !isGuestRoute;

  if (isGuestRoute && signedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!signedIn && isPrivateRoute) {
    return NextResponse.redirect(new URL(`/login?from=${path}`, request.url));
  }

  return response;
}
