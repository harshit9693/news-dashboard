import React, { useState, useEffect } from "react";
import "./PayoutSettings.css";

function PayoutSettings({ filteredArticleCount }) {
  // const [payoutRate, setPayoutRate] = useState(
  //   Number(localStorage.getItem("payoutRate")) || 0
  // );
  const [totalPayout, setTotalPayout] = useState(0);

  // Update total payout whenever the article count or payout rate changes
  useEffect(() => {
    const total = filteredArticleCount * 10;
    setTotalPayout(total);

    // Store total payout in localStorage
    localStorage.setItem("totalPayout", total);
  }, [filteredArticleCount, 10]);

  // Update payout rate in localStorage when it changes
  const handlePayoutRateChange = (e) => {
    // const rate = parseFloat(e.target.value) || 0;
    // setPayoutRate(rate);
    localStorage.setItem("payoutRate", 10);
  };

  return (
    <div className="payout-settings">
      <h3>Payout Settings</h3>
      <div className="payout-input">
        <label htmlFor="payout-rate">Payout per article/blog:</label>
        <input
          id="payout-rate"
          type="number"
          value={10}
          onChange={handlePayoutRateChange}
        />
      </div>
      <div className="payout-summary">
        <p>Number of articles: {filteredArticleCount}</p>
        <p>Total Payout: ${totalPayout.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default PayoutSettings;
