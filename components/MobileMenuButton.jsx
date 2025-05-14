"use client";

import { useState } from "react";

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="container"
      style={{
        position: "absolute",
        top: "5px",
        right: "50px",
        padding: "0",
        margin: "0",
        marginTop: "8px",
        fontSize: "2.8rem",
        zIndex: 1003,
        fontFamily: '"Share Tech", sans-serif',
      }}
    >
      <div
        className="menu"
        id="menu"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "40px",
          height: "40px",
          // marginTop: "8px",
          padding: "0",
          position: "relative",
          background: "transparent",
          borderRadius: "3px",
          cursor: "pointer",
        }}
      >
        <div>
          <span
            className={`line-1 ${isOpen ? "open" : ""}`}
            style={{
              background: "#fff",
              width: "35px",
              height: "3px",
              borderRadius: "1.5px",
              display: "block",
              position: "absolute",
              top: isOpen ? "50%" : "25%",
              left: "50%",
              transform: isOpen
                ? "translate(-50%, -50%) rotate(45deg)"
                : "translate(-50%, 0)",
              transition: "0.3s",
            }}
          />
          <span
            className={`line-2 ${isOpen ? "open" : ""}`}
            style={{
              background: "#fff",
              width: "35px",
              height: "3px",
              borderRadius: "1.5px",
              display: "block",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: isOpen
                ? "translate(-50%, -50%) scale(0)"
                : "translate(-50%, 0)",
              transition: "0.3s",
            }}
          />
          <span
            className={`line-3 ${isOpen ? "open" : ""}`}
            style={{
              background: "#fff",
              width: "35px",
              height: "3px",
              borderRadius: "1.5px",
              display: "block",
              position: "absolute",
              top: isOpen ? "50%" : "75%",
              left: "50%",
              transform: isOpen
                ? "translate(-50%, -50%) rotate(-45deg)"
                : "translate(-50%, 0)",
              transition: "0.3s",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuButton;
