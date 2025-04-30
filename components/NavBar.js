// app/components/NavBar.js
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

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

  useEffect(() => {
    // 當 hoveredItem 變化時，動態添加或移除模糊類到 mainContent
    const mainContent = document.querySelector(".mainContent");
    if (mainContent) {
      if (hoveredItem !== null) {
        mainContent.classList.add(styles.blurContent);
      } else {
        mainContent.classList.remove(styles.blurContent);
      }
    }
  }, [hoveredItem]);

  const handleNavTriggerClick = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveSubmenu(null);
    setActiveDropdown(null);
  };

  const handleDropdownClick = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setActiveSubmenu(index);
  };

  const handleBackToMainMenu = () => {
    setActiveSubmenu(null);
    setActiveDropdown(null);
  };

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.affix : ""}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/bjj-letter-logo.png"
              alt="BJJ Logo"
              width={55}
              height={55}
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
          {/* 主選單 */}
          <div
            className={`${styles.menuContent} ${
              activeSubmenu !== null ? styles.hidden : ""
            }`}
          >
            <ul className={styles.navlinks}>
              <li
                className={`${styles.navItem} ${
                  activeDropdown === 0 ? styles.active : ""
                }`}
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
              >
                <Link href="#" onClick={() => handleDropdownClick(0)}>
                  Submissions
                </Link>
                <div className={styles.dropdownContent}>
                  <Link href="#">Armbar</Link>
                  <Link href="#">Triangle Choke</Link>
                  <Link href="#">Rear Naked Choke</Link>
                  <Link href="#">Kimura</Link>
                </div>
              </li>
              <li
                className={`${styles.navItem} ${
                  activeDropdown === 1 ? styles.active : ""
                }`}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
              >
                <Link href="#" onClick={() => handleDropdownClick(1)}>
                  Guard Passing
                </Link>
                <div className={styles.dropdownContent}>
                  <Link href="#">Toreando Pass</Link>
                  <Link href="#">Knee Cut Pass</Link>
                  <Link href="#">Over-Under Pass</Link>
                  <Link href="#">Standing Guard Break</Link>
                </div>
              </li>
              <li
                className={`${styles.navItem} ${
                  activeDropdown === 2 ? styles.active : ""
                }`}
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
              >
                <Link href="#" onClick={() => handleDropdownClick(2)}>
                  Defense
                </Link>
                <div className={styles.dropdownContent}>
                  <Link href="#">Posture Control</Link>
                  <Link href="#">Submission Escapes</Link>
                  <Link href="#">Guard Retention</Link>
                  <Link href="#">Sweeps</Link>
                </div>
              </li>
              <li
                className={`${styles.navItem} ${
                  activeDropdown === 3 ? styles.active : ""
                }`}
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={handleMouseLeave}
              >
                <Link href="#" onClick={() => handleDropdownClick(3)}>
                  Takedown
                </Link>
                <div className={styles.dropdownContent}>
                  <Link href="#">Single Leg Takedown</Link>
                  <Link href="#">Double Leg Takedown</Link>
                  <Link href="#">Ankle Pick</Link>
                  <Link href="#">Judo Throws</Link>
                </div>
              </li>
            </ul>
          </div>

          {/* 子選單 */}
          {activeSubmenu !== null && (
            <div className={styles.submenu}>
              <div className={styles.backButton} onClick={handleBackToMainMenu}>
                返回
              </div>
              <ul className={styles.submenuList}>
                {activeSubmenu === 0 && (
                  <>
                    <li>
                      <Link href="#">Armbar</Link>
                    </li>
                    <li>
                      <Link href="#">Triangle Choke</Link>
                    </li>
                    <li>
                      <Link href="#">Rear Naked Choke</Link>
                    </li>
                    <li>
                      <Link href="#">Kimura</Link>
                    </li>
                  </>
                )}
                {activeSubmenu === 1 && (
                  <>
                    <li>
                      <Link href="#">Toreando Pass</Link>
                    </li>
                    <li>
                      <Link href="#">Knee Cut Pass</Link>
                    </li>
                    <li>
                      <Link href="#">Over-Under Pass</Link>
                    </li>
                    <li>
                      <Link href="#">Standing Guard Break</Link>
                    </li>
                  </>
                )}
                {activeSubmenu === 2 && (
                  <>
                    <li>
                      <Link href="#">Posture Control</Link>
                    </li>
                    <li>
                      <Link href="#">Submission Escapes</Link>
                    </li>
                    <li>
                      <Link href="#">Guard Retention</Link>
                    </li>
                    <li>
                      <Link href="#">Sweeps</Link>
                    </li>
                  </>
                )}
                {activeSubmenu === 3 && (
                  <>
                    <li>
                      <Link href="#">Single Leg Takedown</Link>
                    </li>
                    <li>
                      <Link href="#">Double Leg Takedown</Link>
                    </li>
                    <li>
                      <Link href="#">Ankle Pick</Link>
                    </li>
                    <li>
                      <Link href="#">Judo Throws</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
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
