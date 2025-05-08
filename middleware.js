import { NextResponse } from "next/server";
import { decrypt } from "./lib/session";
import { cookies } from "next/headers";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login"];

export default async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookieValue = await cookies();
  const cookie = cookieValue.get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}
