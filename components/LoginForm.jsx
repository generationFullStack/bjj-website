// app/components/TestLoginForm.jsx
"use client";

import { login } from "@/actions/action";
import Form from "next/form";
import { useActionState, useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 引入眼睛圖標

export default function TestLoginForm() {
  const [state, action, pending] = useActionState(login, "");
  const [showPassword, setShowPassword] = useState(false); // 控制密碼可視化的狀態

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // 切換密碼可視化
  };

  return (
    <div className="relative w-[500px] h-[500px] flex justify-center items-center">
      {/* 動畫邊框 */}
      <i
        className="absolute inset-0 border-2 border-white rounded-[38%_62%_63%_37%_/_41%_44%_56%_59%] animate-[animate_6s_linear_infinite]"
        style={{ "--clr": "#00ff0a" }}
      ></i>
      <i
        className="absolute inset-0 border-2 border-white rounded-[41%_44%_56%_59%_/_38%_62%_63%_37%] animate-[animate_4s_linear_infinite]"
        style={{ "--clr": "#ff0057" }}
      ></i>
      <i
        className="absolute inset-0 border-2 border-white rounded-[41%_44%_56%_59%_/_38%_62%_63%_37%] animate-[animate2_10s_linear_infinite]"
        style={{ "--clr": "#fffd44" }}
      ></i>

      {/* login Form */}
      <Form
        action={action}
        className="absolute w-[300px] h-full flex flex-col justify-center items-center gap-5"
      >
        <h2 className="text-6xl text-white share-tech-regular">Login</h2>
        <div className="relative w-full">
          <input
            required
            type="email"
            name="email"
            placeholder="email"
            className="w-full p-[12px_20px] bg-transparent border-2 border-white rounded-[40px] text-2xl text-white outline-none placeholder:text-[rgba(255,255,255,0.75)] share-tech-regular"
          />
        </div>
        <div className="relative w-full">
          <input
            required
            type={showPassword ? "text" : "password"} // 根據狀態切換 type
            name="password"
            placeholder="password"
            className="w-full p-[12px_20px] bg-transparent border-2 border-white rounded-[40px] text-2xl text-white outline-none placeholder:text-[rgba(255,255,255,0.75)] share-tech-regular"
          />
          {/* eye */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="relative w-full">
          {" "}
          {/* login button */}
          <button
            type="submit"
            className="w-full p-[12px_20px] bg-gradient-to-r from-[#2828FF] to-[#3C3C3C] border-none rounded-[40px] text-2xl text-white cursor-pointer share-tech-regular"
            disabled={pending}
          >
            {pending ? "Logging in" : "Login"}
          </button>
        </div>
        {state && (
          <p className="text-white text-3xl share-tech-regular">
            {state.error}
          </p>
        )}
        <Link
          href="/signup"
          className="text-white no-underline hover:underline share-tech-regular text-3xl"
        >
          Do not have an account?
        </Link>
      </Form>

      {/* CSS ring 動畫 */}
      <style jsx>{`
        .relative:hover i {
          border-width: 6px;
          border-color: var(--clr);
          filter: drop-shadow(0 0 20px var(--clr));
        }

        @keyframes animate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes animate2 {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}
