import { useState } from "react";

export default function Header({ activePage, setActivePage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = [
    { id: "trails", label: "Trails" },
    { id: "dashboard", label: "My Hikes" },
  ];

  return (
    <header className="header">
      <div className="header-inner">
        <button className="logo" onClick={() => setActivePage("trails")}>
          <span className="logo-icon">⛰</span>
          <span className="logo-text">TrailWise</span>
        </button>

        <nav className="nav">
          {nav.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activePage === item.id ? "active" : ""}`}
              onClick={() => setActivePage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button className="avatar">JD</button>
      </div>
    </header>
  );
}
