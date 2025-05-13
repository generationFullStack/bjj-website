"use server";

import { createSession } from "@/lib/session";
import { Pool } from "pg";
import { redirect } from "next/navigation";
import { deleteSession } from "@/lib/session";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function signup(previousState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO users (email, password_hash) VALUES ('${email}', '${hashedPassword}')`
    );
    client.release();
  } catch (error) {
    console.error(error);
  }
}

export async function login(previousState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT id, password_hash, role FROM users WHERE email = '${email}'`
    );

    client.release();

    if (result.rows.length === 0) {
      return {
        error: "User doesn't exist",
      };
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      result.rows[0]["password_hash"]
    );

    if (!isPasswordMatch) {
      return {
        error: "Incorrect password",
      };
    }

    await createSession(result.rows[0]["id"], result.rows[0]["role"]);
  } catch (error) {
    console.error(error);
    return;
  }

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
