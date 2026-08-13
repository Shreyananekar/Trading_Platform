import React, { useState } from "react";
import axios from "axios";
import "./FundsAction.css";

const AddFunds = () => {
  const [amount, setAmount] = useState("");

  const handleAddFunds = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3002/funds/add",
        {
          amount: Number(amount),
        }
      );

      alert("₹" + amount + " added successfully!");

      console.log(response.data);

      setAmount("");

    } catch (error) {
      console.error("Error adding funds:", error);

      alert("Failed to add funds");
    }
  };

  return (
    <div className="fund-action-page">

      <div className="fund-action-card">

        <h2>Add Funds</h2>

        <p>Add money to your trading account</p>

        <form onSubmit={handleAddFunds}>

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
            Add Funds
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddFunds;