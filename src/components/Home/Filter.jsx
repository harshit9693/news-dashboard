import React, { useState } from "react";
import "./Filter.css";

function Filter({ onFilterChange, onClearFilters }) {
  const [author, setAuthor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");

  const handleFilterChange = () => {
    onFilterChange({
      author,
      startDate,
      endDate,
      type,
    });
  };

  const handleClearFilters = () => {
    setAuthor("");
    setStartDate("");
    setEndDate("");
    setType("");
    if (onClearFilters) {
      onClearFilters(); // Notify parent component to reset filters
    } else {
      onFilterChange({ author: "", startDate: "", endDate: "", type: "" }); // Fallback to reset filters
    }
  };

  return (
    <div className="filter-container">
      <h3>Filters</h3>
      <div className="filter-row">
        <div className="filter-item">
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Filter by Author"
          />
        </div>
        <div className="filter-item">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All</option>
            <option value="news">News</option>
            <option value="blog">Blog</option>
          </select>
        </div>
      </div>
      <div className="button-row">
        <button className="clear-button" onClick={handleClearFilters}>
          Clear Filters
        </button>
        <button className="apply-button" onClick={handleFilterChange}>
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default Filter;
