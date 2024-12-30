import React, { useEffect, useState, useMemo } from "react";
import SignIn from "./components/Login/SignIn.jsx";
import Dashboard from "./components/Home/Dashboard.jsx";
import Navbar from "./components/Home/Navbar.jsx";
import Filter from "./components/Home/Filter.jsx";
import "./App.css"; // Import CSS for layout styling
import PayoutSettings from "./components/Home/PayoutSettings.jsx";
import ExportReports from "./components/Home/ExportReports.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filters, setFilters] = useState({
    author: "",
    startDate: "",
    endDate: "",
    type: "",
  });
  const [filteredArticles, setFilteredArticles] = useState([]); // State for filtered articles
  const [payoutRate, setPayoutRate] = useState(
    Number(localStorage.getItem("payoutRate")) || 0 // Load payout rate from localStorage
  );
  const [theme, setTheme] = useState("light"); // State for theme

  // Memoize the total payout to avoid unnecessary recalculations
  const totalPayout = useMemo(
    () => filteredArticles.length * payoutRate,
    [filteredArticles, payoutRate]
  );

  useEffect(() => {
    // Check if the user is already signed in (e.g., saved in localStorage)
    const email = localStorage.getItem("email");
    if (email) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear local storage and authentication state
    localStorage.removeItem("email");
    setIsAuthenticated(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`app-container ${theme}`}>
      {" "}
      {/* Apply theme class */}
      {isAuthenticated ? (
        <>
          <Navbar
            onSearch={handleSearch}
            onLogout={handleLogout}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <div className="content-container">
            {/* Filter and Payout Settings Section */}
            <div className="filter-section">
              <Filter onFilterChange={handleFilterChange} />
              <PayoutSettings
                payoutRate={payoutRate}
                onPayoutRateChange={(newRate) => {
                  setPayoutRate(newRate);
                  localStorage.setItem("payoutRate", newRate);
                }}
                filteredArticleCount={filteredArticles.length} // Pass filtered articles count
                totalPayout={totalPayout} // Pass total payout
              />
              <ExportReports articles={filteredArticles} />
            </div>
            {/* Dashboard Section */}
            <div className="dashboard-section">
              <Dashboard
                searchQuery={searchQuery}
                filter={filters}
                onFilteredArticlesChange={(articles) => {
                  // Update filtered articles only if the content changes
                  if (
                    JSON.stringify(articles) !==
                    JSON.stringify(filteredArticles)
                  ) {
                    setFilteredArticles(articles);
                  }
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <SignIn onSignIn={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}

export default App;
