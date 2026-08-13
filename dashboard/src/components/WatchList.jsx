import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlist } from "../Data/Data.jsx";
import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
  const [liveStocks, setLiveStocks] = useState(watchlist);

  // ==============================
  // FETCH LIVE MARKET PRICES
  // ==============================

  useEffect(() => {
    const fetchLivePrices = async () => {
      try {
        const response = await axios.get(
          "https://zerodha-stxd.onrender.com/api/market/watchlist"
        );

        const updatedStocks = response.data.map((stock) => ({
          name: stock.symbol,
          price: stock.price,
          percent: `${Number(stock.changePercent).toFixed(2)}%`,
          isDown: stock.change < 0,
        }));

        setLiveStocks(updatedStocks);
      } catch (error) {
        console.error(
          "Failed to fetch live market data:",
          error.message
        );

        // Keep existing data if API fails
        setLiveStocks(watchlist);
      }
    };

    // Fetch immediately
    fetchLivePrices();

    // Refresh every 30 seconds
    const interval = setInterval(() => {
      fetchLivePrices();
    }, 30000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  // ==============================
  // DOUGHNUT CHART DATA
  // ==============================

  const labels = liveStocks.map((stock) => stock.name);

  const data = {
    labels,

    datasets: [
      {
        label: "Price",

        data: liveStocks.map((stock) => stock.price),

        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],

        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],

        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">

      {/* SEARCH */}
      <div className="search-container">

        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg: infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />

        <span className="counts">
          {liveStocks.length} / 50
        </span>

      </div>

      {/* WATCHLIST */}
      <ul className="list">

        {liveStocks.map((stock) => (
          <WatchListItem
            stock={stock}
            key={stock.name}
          />
        ))}

      </ul>

      {/* CHART */}
      <DoughnutChart data={data} />

    </div>
  );
};

export default WatchList;


// ==========================================
// WATCHLIST ITEM
// ==========================================

const WatchListItem = ({ stock }) => {

  const [showWatchlistActions, setShowWatchlistActions] =
    useState(false);

  const handleMouseEnter = () => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = () => {
    setShowWatchlistActions(false);
  };

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      <div className="item">

        <p className={stock.isDown ? "down" : "up"}>
          {stock.name}
        </p>

        <div className="itemInfo">

          <span className="percent">
            {stock.percent}
          </span>

          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}

          <span className="price">
            ₹{Number(stock.price).toFixed(2)}
          </span>

        </div>

      </div>

      {showWatchlistActions && (
        <WatchListActions uid={stock.name} />
      )}

    </li>
  );
};


// ==========================================
// WATCHLIST ACTIONS
// ==========================================

const WatchListActions = ({ uid }) => {

  const generalContext = useContext(GeneralContext);

  // BUY
  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  // SELL
  const handleSellClick = () => {
    generalContext.openSellWindow(uid);
  };

  return (
    <span className="actions">

      <span>

        {/* ================= BUY ================= */}

        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >

          <button
            className="buy"
            onClick={handleBuyClick}
          >
            Buy
          </button>

        </Tooltip>


        {/* ================= SELL ================= */}

        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >

          <button
            className="sell"
            onClick={handleSellClick}
          >
            Sell
          </button>

        </Tooltip>


        {/* ================= ANALYTICS ================= */}

        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >

          <button className="action">

            <BarChartOutlined className="icon" />

          </button>

        </Tooltip>


        {/* ================= MORE ================= */}

        <Tooltip
          title="More"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >

          <button className="action">

            <MoreHoriz className="icon" />

          </button>

        </Tooltip>

      </span>

    </span>
  );
};