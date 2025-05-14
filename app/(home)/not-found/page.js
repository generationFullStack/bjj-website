import Link from "next/link";

// 自定義 404 頁面，當用戶訪問不存在的路徑時顯示
export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        color: "#fff",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        404 - Page Not Found
      </h1>
      <p style={{ fontSize: "20px", marginBottom: "20px" }}>
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        style={{
          fontSize: "18px",
          color: "#60A5FA",
          textDecoration: "underline",
        }}
      >
        Go back to Home
      </Link>
    </div>
  );
}
