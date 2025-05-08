// app/components/NavBar.js
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    const mainContent = document.querySelector(".mainContent");
    if (mainContent) {
      if (hoveredItem !== null || isSearchOpen) {
        mainContent.classList.add(styles.blurContent);
      } else {
        mainContent.classList.remove(styles.blurContent);
      }
    }
  }, [hoveredItem, isSearchOpen]);

  const handleNavTriggerClick = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveSubmenu(null);
    setActiveDropdown(null);
    setIsSearchOpen(false);
  };

  const handleDropdownClick = (index) => {
    if (isMobile) {
      setActiveSubmenu(activeDropdown === index ? null : index);
    } else {
      setActiveDropdown(activeDropdown === index ? null : index);
    }
  };

  const handleBackToMainMenu = () => {
    setActiveSubmenu(null);
    setActiveDropdown(null);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setActiveSubmenu(null);
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("搜尋關鍵字:", searchQuery);
  };

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  // 定義類別和子類別數據
  const navItems = [
    {
      category: "Submissions",
      subcategories: ["Armbar", "Triangle Choke", "Rear Naked Choke", "Kimura"],
    },
    {
      category: "Guard Passing",
      subcategories: [
        "Toreando Pass",
        "Knee Cut Pass",
        "Over-Under Pass",
        "Standing Guard Break",
      ],
    },
    {
      category: "Defense",
      subcategories: [
        "Posture Control",
        "Submission Escapes",
        "Guard Retention",
        "Sweeps",
      ],
    },
    {
      category: "Takedown",
      subcategories: [
        "Single Leg Takedown",
        "Double Leg Takedown",
        "Ankle Pick",
        "Judo Throws",
      ],
    },
  ];

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
            <span className={styles.logoText}>BJJ.JPG</span>
          </Link>
        </div>
        <div
          id="mainListDiv"
          className={`${styles.main_list} ${
            isMenuOpen ? styles.show_list : ""
          }`}
        >
          {isSearchOpen && (
            <div className={styles.searchContainer}>
              <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜尋..."
                  className={styles.searchInput}
                  autoFocus
                />
                <button type="submit" className={styles.searchButton}>
                  <FaSearch />
                </button>
                <button
                  type="button"
                  onClick={handleCloseSearch}
                  className={styles.closeSearchButton}
                >
                  ✕
                </button>
              </form>
            </div>
          )}

          <div
            className={`${styles.menuContent} ${
              activeSubmenu !== null || isSearchOpen ? styles.hidden : ""
            }`}
          >
            <div className={styles.navContent}>
              <ul
                className={`${styles.navlinks} ${
                  activeSubmenu !== null || isSearchOpen ? styles.hidden : ""
                }`}
              >
                {navItems.map((item, index) => (
                  <li
                    key={item.category}
                    className={`${styles.navItem} ${
                      activeDropdown === index ? styles.active : ""
                    }`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={`/${encodeURIComponent(item.category)}`} // 對類別名稱進行 URL 編碼
                      onClick={() => handleDropdownClick(index)}
                    >
                      {item.category}
                    </Link>
                    <div className={styles.dropdownContent}>
                      {item.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory}
                          href={`/${encodeURIComponent(
                            item.category
                          )}/${encodeURIComponent(subcategory)}`} // 對子類別名稱進行 URL 編碼
                        >
                          {subcategory}
                        </Link>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
              {!isMobile && (
                <span
                  className={styles.searchIconTop}
                  onClick={handleSearchClick}
                >
                  <FaSearch />
                </span>
              )}
            </div>
          </div>

          {activeSubmenu !== null && isMobile && (
            <div className={styles.submenu}>
              <div className={styles.backButton} onClick={handleBackToMainMenu}>
                返回
              </div>
              <ul className={styles.submenuList}>
                {navItems[activeSubmenu].subcategories.map((subcategory) => (
                  <li key={subcategory}>
                    <Link
                      href={`/${encodeURIComponent(
                        navItems[activeSubmenu].category
                      )}/${encodeURIComponent(subcategory)}`} // 對類別和子類別名稱進行 URL 編碼
                    >
                      {subcategory}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {isMobile && (
          <span
            className={`${styles.searchIconTop} ${
              isMenuOpen || isSearchOpen ? styles.hidden : ""
            }`}
            onClick={handleSearchClick}
          >
            <FaSearch />
          </span>
        )}
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
