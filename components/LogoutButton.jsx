"use client";

import { logout } from "@/actions/action";

export default function LogoutButton() {
  return (
    <button className="text-3xl border-2 p-3" onClick={() => logout()}>
      logout
    </button>
  );
}
