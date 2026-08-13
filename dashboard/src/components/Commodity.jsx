import React from "react";
import "./FundsAction.css";

const Commodity = () => {
  return (
    <div className="fund-action-page">
      <div className="fund-action-card commodity-card">
        <h2>Commodity Account</h2>

        <p>
          You don't currently have a commodity account.
        </p>

        <p>
          Open a commodity trading account to trade
          commodities such as gold, silver and crude oil.
        </p>

        <button
          className="fund-submit"
          onClick={() => alert("Commodity account request submitted!")}
        >
          Open Commodity Account
        </button>
      </div>
    </div>
  );
};

export default Commodity;