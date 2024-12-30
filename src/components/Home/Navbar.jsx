import React from "react";
import "./Navbar.css";

function Navbar({ onSearch, onLogout, theme, toggleTheme }) {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-logo">Dashboard</div>
      <input
        type="text"
        className="navbar-search"
        placeholder="Search articles..."
        onChange={handleSearchChange}
      />
      <div className="navbar-actions">
        <button className="navbar-theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
        <button className="navbar-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
