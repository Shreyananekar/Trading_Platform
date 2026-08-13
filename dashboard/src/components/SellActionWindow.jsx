import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const ctx = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const handleSellClick = async () => {
    const newOrder = {
      id: Date.now(),
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "SELL",
    };

    try {
      await axios.post(
        "https://zerodha-stxd.onrender.com/newOrder",
        newOrder
      );

      ctx.addOrder(newOrder);

      ctx.closeSellWindow();
    } catch (err) {
      console.error("Error placing sell order:", err);
      alert("Failed to place sell order. Try again.");
    }
  };

  const handleCancelClick = () => {
    ctx.closeSellWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">

      <div className="regular-order">

        <div className="inputs">

          <fieldset>
            <legend>Qty.</legend>

            <input
              type="number"
              value={stockQuantity}
              onChange={(e) =>
                setStockQuantity(Number(e.target.value))
              }
              min={1}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>

            <input
              type="number"
              step="0.05"
              value={stockPrice}
              onChange={(e) =>
                setStockPrice(Number(e.target.value))
              }
              min={0}
            />
          </fieldset>

        </div>

      </div>

      <div className="buttons">

        <span>Margin required ₹140.65</span>

        <div>

          <Link
            className="btn btn-blue"
            onClick={handleSellClick}
          >
            Sell
          </Link>

          <Link
            className="btn btn-grey"
            onClick={handleCancelClick}
          >
            Cancel
          </Link>

        </div>

      </div>

    </div>
  );
};

export default SellActionWindow;