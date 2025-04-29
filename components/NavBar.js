// src/app/components/NavBar.js
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./NavBar.module.css";
import Link from "next/link";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  const handleNavTriggerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.affix : ""}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/bjj-letter-logo.png"
              alt="BJJ Logo"
              width={60}
              height={60}
              style={{ verticalAlign: "middle" }}
            />
            <span className={styles.logoText}>快啲諗名</span>
          </Link>
        </div>
        <div
          id="mainListDiv"
          className={`${styles.main_list} ${
            isMenuOpen ? styles.show_list : ""
          }`}
        >
          <ul className={styles.navlinks}>
            <li className={styles.navItem}>
              <Link href="/about">About</Link>
            </li>
            <li className={styles.navItem}>
              <a href="#">Portfolio</a>
            </li>
            <li className={styles.navItem}>
              <a href="#">Services</a>
            </li>
            <li className={styles.navItem}>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <span
          className={`${styles.navTrigger} ${isMenuOpen ? styles.active : ""}`}
          onClick={handleNavTriggerClick}
        >
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
    </nav>
  );
}
