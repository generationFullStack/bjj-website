"use client";
import { submitLoginForm } from "@/actions/action";
import Form from "next/form";
import { useActionState } from "react";

export default function LoginForm() {
  const [state, action, pending] = useActionState(submitLoginForm, "");

  return (
    <div className="w-full border-2 text-3xl">
      <h1 className="text-center text-5xl mt-5">Login page</h1>
      <Form action={action} className="flex flex-col gap-5 items-center p-10">
        <div className="border-2 border-white/50">
          <input name="email" placeholder="email" />
        </div>
        <div className="border-2 border-white/50">
          <input name="password" placeholder="password" />
        </div>
        <button type="submit" className="border-2 border-white/50 p-1">
          {pending ? "Logging in" : "Login"}
        </button>
        {state && <p>{state.error}</p>}
      </Form>
    </div>
  );
}
