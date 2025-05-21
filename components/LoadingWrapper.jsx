// src/app/components/LoadingWrapper.js
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // 引入 usePathname
import Image from "next/image";
import styles from "./Loading.module.css";

export default function LoadingWrapper({ children }) {
  const pathname = usePathname(); // 獲取當前路由
  const [isLoading, setIsLoading] = useState(pathname === "/"); // 僅在首頁顯示載入畫面

  useEffect(() => {
    if (pathname === "/") {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <>
      {isLoading ? (
        <div className={styles.loadingOverlay}>
          <Image
            src="/bjj-letter-logo.png"
            alt="BJJ Logo"
            width={500}
            height={500}
            className={styles.loadingLogo}
          />
        </div>
      ) : (
        <div className={styles.mainContent}>{children}</div>
      )}
    </>
  );
}
