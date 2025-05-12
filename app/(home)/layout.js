// app/layout.js
import "../globals.css";
import NavBar from "../../components/NavBar";
import LoadingWrapper from "../../components/LoadingWrapper";
import Footer from "../../components/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const metadata = {
  title: "BJJ.JPG",
  description: "A simple Next.js app with a styled nav bar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* 引入 Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Share+Tech&display=swap"
          rel="stylesheet"
        />
      </head>
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
