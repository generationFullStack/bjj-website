import "server-only";

import { cookies } from "next/headers";
import { decrypt, deleteSession } from "./session";
import { redirect } from "next/navigation";
import { cache } from "react";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId, role: session.role };
});

export const getSession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) {
    return null;
  }

  const session = await decrypt(cookie);

  return session;
});
