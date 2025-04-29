// src/app/components/Footer.js
"use client";

import Image from "next/image";
import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              src="/bjj-letter-logo.png"
              alt="BJJ Logo"
              width={50}
              height={50}
              className={styles.logoImage}
            />
            <span>BJJ</span>
          </Link>
        </div>
        <div className={styles.socialMedia}>
          <a href="#" className={styles.facebook}>
            <i className="fab fa-facebook-f fa-2xs"></i>
          </a>
          <a href="#" className={styles.twitter}>
            <i className="fab fa-x-twitter fa-2xs"></i>
          </a>
          <a href="#" className={styles.instagram}>
            <i className="fab fa-instagram fa-2xs"></i>
          </a>
          <a href="#" className={styles.youtube}>
            <i className="fab fa-youtube fa-2xs"></i>
          </a>
        </div>
        <p>BJJ © 2025 All Rights Reserved. Desgin by PAN & JASON & GAVIN</p>
      </div>
    </footer>
  );
}
