import React, { useState } from "react";
import axios from "axios";
import "./FundsAction.css";

const WithdrawFunds = () => {
  const [amount, setAmount] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3002/funds/withdraw",
        {
          amount: Number(amount),
        }
      );

      alert(`₹${amount} withdrawn successfully!`);

      console.log(response.data);

      setAmount("");

    } catch (error) {
      console.error("Error withdrawing funds:", error);

      alert(
        error.response?.data?.message ||
        "Failed to withdraw funds"
      );
    }
  };

  return (
    <div className="fund-action-page">
      <div className="fund-action-card">

        <h2>Withdraw Funds</h2>

        <p>
          Withdraw money from your trading account
        </p>

        <form onSubmit={handleWithdraw}>

          <label>Amount</label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
          />

          <button
            type="submit"
            className="fund-submit"
          >
            Withdraw
          </button>

        </form>

      </div>
    </div>
  );
};

export default WithdrawFunds;