"use client";

import { signup } from "@/actions/action";
import Form from "next/form";
import { useActionState } from "react";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, "");
  return (
    <div className="text-3xl p-5 border-2 w-full">
      <h1 className="mb-5 text-center">SignUp Form</h1>
      <Form className="flex flex-col gap-5" action={action}>
        <input
          className="p-2 bg-white/10 rounded-xl"
          required
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          className="p-2 bg-white/10 rounded-xl"
          required
          type="password"
          name="password"
          placeholder="password"
        />
        <button type="submit" className="border-2">
          {pending ? "submitting..." : "signup"}
        </button>
      </Form>
    </div>
  );
}
