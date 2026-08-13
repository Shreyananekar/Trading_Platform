import React, { useEffect, useState } from "react";
import axios from "axios";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);

  const [funds, setFunds] = useState({
    balance: 0,
    usedMargin: 0,
    availableCash: 0,
  });

  // =========================
  // GET USER NAME
  // =========================

  const user = JSON.parse(localStorage.getItem("user"));

  const userName = user?.name || "User";

  // =========================
  // FETCH HOLDINGS
  // =========================

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await axios.get(
          "https://zerodha-stxd.onrender.com/allHoldings"
        );

        setHoldings(response.data);
      } catch (error) {
        console.error("Error fetching holdings:", error);
      }
    };

    fetchHoldings();
  }, []);

  // =========================
  // FETCH FUNDS
  // =========================

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await axios.get(
          "https://zerodha-stxd.onrender.com/funds"
        );

        setFunds(response.data);
      } catch (error) {
        console.error("Error fetching funds:", error);
      }
    };

    fetchFunds();
  }, []);

  // =========================
  // HOLDINGS CALCULATIONS
  // =========================

  const totalInvestment = holdings.reduce(
    (total, stock) =>
      total +
      Number(stock.avg || 0) * Number(stock.qty || 0),
    0
  );

  const currentValue = holdings.reduce(
    (total, stock) =>
      total +
      Number(stock.price || 0) * Number(stock.qty || 0),
    0
  );

  const profitLoss = currentValue - totalInvestment;

  const profitLossPercentage =
    totalInvestment > 0
      ? (profitLoss / totalInvestment) * 100
      : 0;

  const profitClass =
    profitLoss >= 0 ? "profit" : "loss";

  return (
    <>
      {/* =========================
          USERNAME
      ========================= */}

      <div className="username">
        <h6>Hi, {userName}!</h6>

        <hr className="divider" />
      </div>

      {/* =========================
          EQUITY
      ========================= */}

      <div className="section">

        <span>
          <p>Equity</p>
        </span>

        <div className="data">

          {/* AVAILABLE MARGIN */}

          <div className="first">

            <h3>
              ₹
              {Number(
                funds.availableCash || 0
              ).toFixed(2)}
            </h3>

            <p>Margin available</p>

          </div>

          <hr />

          {/* MARGIN DETAILS */}

          <div className="second">

            <p>
              Margins used

              <span>
                ₹
                {Number(
                  funds.usedMargin || 0
                ).toFixed(2)}
              </span>
            </p>

            <p>
              Opening balance

              <span>
                ₹
                {Number(
                  funds.balance || 0
                ).toFixed(2)}
              </span>
            </p>

          </div>

        </div>

        <hr className="divider" />

      </div>

      {/* =========================
          HOLDINGS
      ========================= */}

      <div className="section">

        <span>
          <p>
            Holdings ({holdings.length})
          </p>
        </span>

        <div className="data">

          {/* P&L */}

          <div className="first">

            <h3 className={profitClass}>

              ₹{profitLoss.toFixed(2)}

              <small>
                {" "}
                (
                {profitLossPercentage.toFixed(2)}
                %)
              </small>

            </h3>

            <p>P&L</p>

          </div>

          <hr />

          {/* HOLDINGS DETAILS */}

          <div className="second">

            <p>
              Current Value

              <span>
                ₹{currentValue.toFixed(2)}
              </span>
            </p>

            <p>
              Investment

              <span>
                ₹{totalInvestment.toFixed(2)}
              </span>
            </p>

          </div>

        </div>

        <hr className="divider" />

      </div>
    </>
  );
};

export default Summary;