"use client";
import { login } from "@/actions/action";
import Form from "next/form";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, "");

  return (
    <div className="w-full border-2 text-3xl">
      <h1 className="text-center text-5xl mt-5">Login page</h1>
      <Form action={action} className="flex flex-col gap-5 items-center p-10">
        <input
          required
          className="p-2 bg-white/10 rounded-xl"
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          required
          className="p-2 bg-white/10 rounded-xl"
          type="password"
          name="password"
          placeholder="password"
        />
        <button type="submit" className="border-2 border-white/50 p-1">
          {pending ? "Logging in" : "Login"}
        </button>
        {state && <p>{state.error}</p>}
        <a
          href="http://localhost:3000/signup"
          className="no-underline hover:underline"
        >
          Do not have an account?
        </a>
      </Form>
    </div>
  );
}
