import "../globals.css";
import NavBar from "../../components/NavBar";
import LoadingWrapper from "../../components/LoadingWrapper";
import Footer from "../../components/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Geist, Geist_Mono } from "next/font/google";

export const metadata = {
  title: "BJJ",
  description: "A simple Next.js app with a styled nav bar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LoadingWrapper>
          <NavBar />
          <main className="mainContent">{children}</main>
          <Footer />
        </LoadingWrapper>
      </body>
    </html>
  );
}
