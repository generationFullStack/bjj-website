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
                <li
                  className={`${styles.navItem} ${
                    activeDropdown === 0 ? styles.active : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(0)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href="/Submissions"
                    onClick={() => handleDropdownClick(0)}
                  >
                    Submissions
                  </Link>
                  <div className={styles.dropdownContent}>
                    <Link href="/Submissions/Armbar">Armbar</Link>
                    <Link href="/Submissions/Triangle Choke">
                      Triangle Choke
                    </Link>
                    <Link href="/Submissions/Rear Naked Choke">
                      Rear Naked Choke
                    </Link>
                    <Link href="/Submissions/Kimura">Kimura</Link>
                  </div>
                </li>
                <li
                  className={`${styles.navItem} ${
                    activeDropdown === 1 ? styles.active : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(1)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href="/Guard Passing"
                    onClick={() => handleDropdownClick(1)}
                  >
                    Guard Passing
                  </Link>
                  <div className={styles.dropdownContent}>
                    <Link href="/Guard Passing/Toreando Pass">
                      Toreando Pass
                    </Link>
                    <Link href="/Guard Passing/Knee Cut Pass">
                      Knee Cut Pass
                    </Link>
                    <Link href="/Guard Passing/Over-Under Pass">
                      Over-Under Pass
                    </Link>
                    <Link href="/Guard Passing/Standing Guard Break">
                      Standing Guard Break
                    </Link>
                  </div>
                </li>
                <li
                  className={`${styles.navItem} ${
                    activeDropdown === 2 ? styles.active : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(2)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href="/Defense" onClick={() => handleDropdownClick(2)}>
                    Defense
                  </Link>
                  <div className={styles.dropdownContent}>
                    <Link href="/Defense/Posture Control">Posture Control</Link>
                    <Link href="/Defense/Submission Escapes">
                      Submission Escapes
                    </Link>
                    <Link href="/Defense/Guard Retention">Guard Retention</Link>
                    <Link href="/Defense/Sweeps">Sweeps</Link>
                  </div>
                </li>
                <li
                  className={`${styles.navItem} ${
                    activeDropdown === 3 ? styles.active : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(3)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href="/Takedown" onClick={() => handleDropdownClick(3)}>
                    Takedown
                  </Link>
                  <div className={styles.dropdownContent}>
                    <Link href="/Takedown/Single Leg Takedown">
                      Single Leg Takedown
                    </Link>
                    <Link href="/Takedown/Double Leg Takedown">
                      Double Leg Takedown
                    </Link>
                    <Link href="/Takedown/Ankle Pick">Ankle Pick</Link>
                    <Link href="/Takedown/Judo Throws">Judo Throws</Link>
                  </div>
                </li>
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
                {activeSubmenu === 0 && (
                  <>
                    <li>
                      <Link href="/Submissions/Armbar">Armbar</Link>
                    </li>
                    <li>
                      <Link href="/Submissions/Triangle Choke">
                        Triangle Choke
                      </Link>
                    </li>
                    <li>
                      <Link href="/Submissions/Rear Naked Choke">
                        Rear Naked Choke
                      </Link>
                    </li>
                    <li>
                      <Link href="/Submissions/Kimura">Kimura</Link>
                    </li>
                  </>
                )}
                {activeSubmenu === 1 && (
                  <>
                    <li>
                      <Link href="/Guard Passing/Toreando Pass">
                        Toreando Pass
                      </Link>
                    </li>
                    <li>
                      <Link href="/Guard Passing/Knee Cut Pass">
                        Knee Cut Pass
                      </Link>
                    </li>
                    <li>
                      <Link href="/Guard Passing/Over-Under Pass">
                        Over-Under Pass
                      </Link>
                    </li>
                    <li>
                      <Link href="/Guard Passing/Standing Guard Break">
                        Standing Guard Break
                      </Link>
                    </li>
                  </>
                )}
                {activeSubmenu === 2 && (
                  <>
                    <li>
                      <Link href="/Defense/Posture Control">
                        Posture Control
                      </Link>
                    </li>
                    <li>
                      <Link href="/Defense/Submission Escapes">
                        Submission Escapes
                      </Link>
                    </li>
                    <li>
                      <Link href="/Defense/Guard Retention">
                        Guard Retention
                      </Link>
                    </li>
                    <li>
                      <Link href="/Defense/Sweeps">Sweeps</Link>
                    </li>
                  </>
                )}
                {activeSubmenu === 3 && (
                  <>
                    <li>
                      <Link href="/Takedown/Single Leg Takedown">
                        Single Leg Takedown
                      </Link>
                    </li>
                    <li>
                      <Link href="/Takedown/Double Leg Takedown">
                        Double Leg Takedown
                      </Link>
                    </li>
                    <li>
                      <Link href="/Takedown/Ankle Pick">Ankle Pick</Link>
                    </li>
                    <li>
                      <Link href="/Takedown/Judo Throws">Judo Throws</Link>
                    </li>
                  </>
                )}
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
