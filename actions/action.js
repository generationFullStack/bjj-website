"use server";

import { createSession } from "@/lib/session";
import { Pool } from "pg";
import { redirect } from "next/navigation";
import { deleteSession } from "@/lib/session";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function signUp(formData) {
  try {
  } catch (error) {
    console.error("Error createing user: ", error);

    return {
      success: false,
      messgae: "Failed to create an account",
    };
  }
}

export async function submitLoginForm(previousState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const client = await pool.connect();
  const result = await client.query(
    `SELECT id FROM users WHERE email = '${email}' AND password_hash = '${password}'`
  );
  client.release();

  const userId = result.rows[0]["id"];
  console.log(userId);

  if (result.rows.length === 0) {
    return {
      error: "Login failed",
    };
  }

  await createSession(userId);

  console.log("login successful");

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
