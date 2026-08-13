import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Funds.css";

const Funds = () => {
  const [funds, setFunds] = useState({
    balance: 10000,
    usedMargin: 0,
    availableCash: 10000,
  });

  useEffect(() => {
    fetchFunds();
  }, []);

  const fetchFunds = async () => {
    try {
      const response = await axios.get("https://zerodha-stxd.onrender.com/funds");

      setFunds(response.data);
    } catch (error) {
      console.error("Failed to fetch funds:", error);
    }
  };

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>

        <Link to="/funds/add" className="btn btn-green">
          Add funds
        </Link>

        <Link to="/funds/withdraw" className="btn btn-blue">
          Withdraw
        </Link>
      </div>

      <div className="row">

        {/* EQUITY */}
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">

            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">
                ₹{funds.availableCash.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Used margin</p>
              <p className="imp">
                ₹{funds.usedMargin.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Available cash</p>
              <p className="imp">
                ₹{funds.availableCash.toFixed(2)}
              </p>
            </div>

            <div className="data">
              <p>Total balance</p>
              <p className="imp">
                ₹{funds.balance.toFixed(2)}
              </p>
            </div>

          </div>
        </div>

        {/* COMMODITY */}
        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>

            <Link to="/commodity" className="btn btn-blue">
              Open Account
            </Link>
          </div>
        </div>

      </div>
    </>
  );
};

export default Funds;