import React from "react";
import "./Apps.css";

const Apps = () => {
  return (
    <div className="apps-page">

      <h2>Apps</h2>

      <p className="apps-subtitle">
        Explore tools and applications available on your trading platform.
      </p>

      <div className="apps-grid">

        <div className="app-card">
          <div className="app-icon">📊</div>

          <h3>Market Analytics</h3>

          <p>
            Analyze stock prices, market trends and performance.
          </p>

          <button>
            Explore
          </button>
        </div>

        <div className="app-card">
          <div className="app-icon">📈</div>

          <h3>TradingView</h3>

          <p>
            View charts and analyze stocks using technical indicators.
          </p>

          <button>
            Open
          </button>
        </div>

        <div className="app-card">
          <div className="app-icon">📰</div>

          <h3>Market News</h3>

          <p>
            Stay updated with the latest stock market news.
          </p>

          <button>
            Read News
          </button>
        </div>

        <div className="app-card">
          <div className="app-icon">💼</div>

          <h3>Portfolio Analytics</h3>

          <p>
            Analyze your holdings and portfolio performance.
          </p>

          <button>
            View Portfolio
          </button>
        </div>

      </div>

    </div>
  );
};

export default Apps;