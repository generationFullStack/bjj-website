"use server";

import { createSession } from "@/lib/session";
import { Pool } from "pg";

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

  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM users WHERE email = '${email}' AND password_hash = '${password}'`
    );
    client.release();

    if (result.rows.length === 0) {
      console.log("login failed");
      return;
    }
  } catch (error) {}

  //await createSession(email);
  console.log("login successful");

  return "error!";
}
