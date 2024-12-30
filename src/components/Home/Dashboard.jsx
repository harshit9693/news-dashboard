import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Chart } from "chart.js/auto";
import "./Dashboard.css";

function Dashboard({ searchQuery, filter, onFilteredArticlesChange }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [payoutRate, setPayoutRate] = useState(10); // Default payout rate
  const chartRef = useRef(null); // Reference to the Chart instance

  const isMobile = window.innerWidth <= 768; // Check if the device is mobile
  const STORAGE_KEY = "offlineArticles"; // Key for localStorage

  // Function to save articles to localStorage
  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Function to load articles from localStorage
  const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=technology&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
        const data = response.data.articles.map((article, index) => ({
          id: index,
          title: article.title,
          author: article.author || "Unknown",
          date: article.publishedAt,
          type: "news",
          description: article.description,
          source: article.source.name,
        }));

        // Save fetched articles to localStorage
        saveToLocalStorage(STORAGE_KEY, data);

        setArticles(data);
      } catch (err) {
        setError("Failed to fetch articles. Loading offline data...");
        // Load articles from localStorage
        const offlineData = loadFromLocalStorage(STORAGE_KEY);
        if (offlineData.length > 0) {
          setArticles(offlineData);
        } else {
          setError("No offline data available.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const titleMatch = searchQuery
      ? article.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const authorMatch = filter.author
      ? article.author.toLowerCase().includes(filter.author.toLowerCase())
      : true;

    const dateMatch =
      filter.startDate && filter.endDate
        ? new Date(article.date) >= new Date(filter.startDate) &&
          new Date(article.date) <= new Date(filter.endDate)
        : true;

    const typeMatch = filter.type ? article.type === filter.type : true;

    return titleMatch && authorMatch && dateMatch && typeMatch;
  });

  useEffect(() => {
    if (onFilteredArticlesChange) {
      onFilteredArticlesChange(filteredArticles);
    }
  }, [filteredArticles, onFilteredArticlesChange]);

  const renderAuthorChart = () => {
    const ctx = document.getElementById("authorChart").getContext("2d");

    // Destroy existing chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const authorCounts = filteredArticles.reduce((acc, article) => {
      acc[article.author] = (acc[article.author] || 0) + 1;
      return acc;
    }, {});

    const sortedAuthors = Object.entries(authorCounts)
      .map(([author, count]) => ({ author, count }))
      .sort((a, b) => b.count - a.count);

    // Limit to top 5 authors on mobile
    const displayedAuthors = isMobile
      ? sortedAuthors.slice(0, 5)
      : sortedAuthors;

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: displayedAuthors.map((entry) => entry.author),
        datasets: [
          {
            label: "Articles by Author",
            data: displayedAuthors.map((entry) => entry.count),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });
  };

  useEffect(() => {
    if (articles.length > 0) {
      renderAuthorChart();
    }
  }, [filteredArticles, isMobile]);

  const authorPayouts = Object.entries(
    filteredArticles.reduce((acc, article) => {
      if (!acc[article.author]) {
        acc[article.author] = { count: 0, payout: 0 };
      }
      acc[article.author].count += 1;
      acc[article.author].payout += payoutRate;
      return acc;
    }, {})
  )
    .map(([author, data]) => ({ author, ...data }))
    .sort((a, b) => b.payout - a.payout) // Sort by payout in descending order
    .slice(0, 8); // Get top 8 authors

  return (
    <div className="chart-and-payout-container">
      {/* Graph Section */}
      <div className="chart-container">
        <h2>Article Trends</h2>
        <canvas id="authorChart"></canvas>
      </div>

      {/* Payout Per Article Input */}
      <div className="payout-input">
        <label htmlFor="payoutRate">Payout Per Article:</label>
        <input
          type="number"
          id="payoutRate"
          value={payoutRate}
          onChange={(e) => setPayoutRate(Number(e.target.value))}
        />
      </div>

      {/* Payout Details Section */}
      <h2>Top Authors by Payout</h2>
      <div className="responsive-table-payout">
        <table>
          <thead>
            <tr>
              <th>Author</th>
              <th>Articles Count</th>
              <th>Total Payout</th>
            </tr>
          </thead>
          <tbody>
            {authorPayouts.map((author, index) => (
              <tr key={index}>
                <td>{author.author}</td>
                <td>{author.count}</td>
                <td>${(author.count * payoutRate).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Full Articles List Section */}
      <h2>Full Articles List</h2>
      <div className="responsive-table-articles-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>Type</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((article, index) => (
              <tr key={index}>
                <td>{article.title}</td>
                <td>{article.author}</td>
                <td>{new Date(article.date).toLocaleDateString()}</td>
                <td>{article.type}</td>
                <td>{article.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
