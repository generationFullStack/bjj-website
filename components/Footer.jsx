"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#151414] py-5">
      <div className="max-w-[1300px] mx-auto px-5 flex justify-between items-center flex-wrap-reverse text-white">
        <div className="flex items-center text-lg font-bold">
          <Link href="/" className="flex items-center text-white no-underline">
            <Image
              src="/bjj-letter-logo.png"
              alt="BJJ Logo"
              width={50}
              height={50}
              className="mr-2.5"
            />
            <span className="hover:text-[#757575] transition-colors duration-600">
              BJJ
            </span>
          </Link>
        </div>
        <div className="my-5 flex gap-4">
          <a
            href="#"
            className="text-white text-2xl hover:text-[#3b5998] transition-colors duration-600"
          >
            <i className="fab fa-facebook-f fa-2xs"></i>
          </a>
          <a
            href="#"
            className="text-white text-2xl hover:text-[#71767b] transition-colors duration-600"
          >
            <i className="fab fa-x-twitter fa-2xs"></i>
          </a>
          <a
            href="#"
            className="text-white text-2xl hover:text-[#e1306c] transition-colors duration-600"
          >
            <i className="fab fa-instagram fa-2xs"></i>
          </a>
          <a
            href="#"
            className="text-white text-2xl hover:text-[#ff0000] transition-colors duration-600"
          >
            <i className="fab fa-youtube fa-2xs"></i>
          </a>
        </div>
        <p className="text-[#757575]">
          BJJ © 2025 All Rights Reserved. Desgin by PAN & JASON & GAVIN
        </p>
      </div>
    </footer>
  );
}
