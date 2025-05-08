import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const encodeKey = new TextEncoder().encode(process.env.SESSION_SECRET);

/*
type SessionPayload = {
    email: string;
    expiresAt: Date;
}
*/

export async function createSession(userId) {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  cookies().delete("session");
}

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2mins")
    .sign(encodeKey);
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodeKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}
