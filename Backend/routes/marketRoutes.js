const express = require("express");
const { default: YahooFinance } = require("yahoo-finance2");

const yahooFinance = new YahooFinance();
const router = express.Router();

// Frontend symbol -> Yahoo Finance NSE symbol
const symbolMap = {
  INFY: "INFY.NS",
  ONGC: "ONGC.NS",
  TCS: "TCS.NS",
  KPITTECH: "KPITTECH.NS",
  QUICKHEAL: "QUICKHEAL.NS",
  WIPRO: "WIPRO.NS",
  "M&M": "M&M.NS",
  RELIANCE: "RELIANCE.NS",
  HUL: "HINDUNILVR.NS",
};

// ==========================================
// GET LIVE STOCK QUOTE
// ==========================================

router.get("/quote/:symbol", async (req, res) => {
  try {
    const frontendSymbol = req.params.symbol.toUpperCase();

    const yahooSymbol = symbolMap[frontendSymbol];

    if (!yahooSymbol) {
      return res.status(400).json({
        message: `Unsupported stock symbol: ${frontendSymbol}`,
      });
    }

    console.log(
      `Fetching live price: ${frontendSymbol} -> ${yahooSymbol}`
    );

    const quote = await yahooFinance.quote(yahooSymbol);

    const price = quote.regularMarketPrice;
    const previousClose = quote.regularMarketPreviousClose;

    if (price === undefined || price === null) {
      return res.status(404).json({
        message: `No market price available for ${frontendSymbol}`,
      });
    }

    const change =
      quote.regularMarketChange ??
      (price - previousClose);

    const changePercent =
      quote.regularMarketChangePercent ??
      ((change / previousClose) * 100);

    res.json({
      symbol: frontendSymbol,
      name: quote.longName || quote.shortName || frontendSymbol,
      price: Number(price.toFixed(2)),
      change: Number(change.toFixed(2)),
      changePercent: Number(changePercent.toFixed(2)),
      lastUpdated: quote.regularMarketTime,
    });

  } catch (error) {
    console.error(
      "Market API error:",
      error.message
    );

    res.status(500).json({
      message: "Failed to fetch market data",
      error: error.message,
    });
  }
});

// ==========================================
// GET COMPLETE WATCHLIST
// ==========================================

router.get("/watchlist", async (req, res) => {
  try {
    const symbols = Object.values(symbolMap);

    const quotes = await yahooFinance.quote(symbols);

    const stocks = quotes.map((quote) => {
      const frontendSymbol = Object.keys(symbolMap).find(
        (key) => symbolMap[key] === quote.symbol
      );

      const price = quote.regularMarketPrice;
      const change =
        quote.regularMarketChange || 0;

      const changePercent =
        quote.regularMarketChangePercent || 0;

      return {
        symbol: frontendSymbol,
        name:
          quote.longName ||
          quote.shortName ||
          frontendSymbol,
        price: Number(price?.toFixed(2) || 0),
        change: Number(change.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2)),
        isDown: change < 0,
        lastUpdated: quote.regularMarketTime,
      };
    });

    res.json(stocks);

  } catch (error) {
    console.error(
      "Watchlist API error:",
      error.message
    );

    res.status(500).json({
      message: "Failed to fetch watchlist",
      error: error.message,
    });
  }
});

module.exports = router;