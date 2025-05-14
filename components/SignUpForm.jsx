"use client";

import { signup } from "@/actions/action";
import Form from "next/form";
import { useActionState, useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 引入眼睛圖標

export default function SignUpForm() {
  const [state, action, pending] = useActionState(signup, "");
  const [showPassword, setShowPassword] = useState(false); // 控制密碼可視化的狀態
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 控制確認密碼可視化的狀態
  const [error, setError] = useState(""); // 控制密碼不匹配的錯誤訊息

  // 切換密碼可視化
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 切換確認密碼可視化
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // 表單提交處理，檢查密碼是否匹配
  const handleSubmit = async (formData) => {
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    // 檢查密碼是否匹配
    if (password !== confirmPassword) {
      setError("Passwords do not match"); // 設置錯誤訊息
      return; // 阻止表單提交
    }

    setError(""); // 清空錯誤訊息
    await action(formData); // 繼續提交表單
  };

  return (
    <div className="relative w-[500px] h-[550px] flex justify-center items-center">
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

      {/* signup form */}
      <Form
        action={handleSubmit} // 使用自定義的 handleSubmit 函數處理表單提交
        className="absolute w-[300px] h-full flex flex-col justify-center items-center gap-5"
      >
        <h2 className="text-6xl text-white share-tech-regular">SignUp</h2>
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
          {/* 眼睛圖標 */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="relative w-full">
          <input
            required
            type={showConfirmPassword ? "text" : "password"} // 根據狀態切換 type
            name="confirmPassword"
            placeholder="confirm password"
            className="w-full p-[12px_20px] bg-transparent border-2 border-white rounded-[40px] text-2xl text-white outline-none placeholder:text-[rgba(255,255,255,0.75)] share-tech-regular"
          />
          {/* 眼睛圖標 */}
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl cursor-pointer"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {/* 錯誤訊息顯示 */}
        {error && (
          <p className="text-red-500 text-3xl share-tech-regular">{error}</p>
        )}
        <div className="relative w-full">
          <button
            type="submit"
            className="w-full p-[12px_20px] bg-gradient-to-r from-[#2828FF] to-[#3C3C3C] border-none rounded-[40px] text-2xl text-white cursor-pointer share-tech-regular"
            disabled={pending}
          >
            {pending ? "Submitting..." : "Signup"}
          </button>
        </div>
        <Link
          href="http://localhost:3000/login"
          className="text-white no-underline hover:underline share-tech-regular text-3xl"
        >
          Already have an account?
        </Link>
      </Form>

      {/* 自定義動畫樣式 */}
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
