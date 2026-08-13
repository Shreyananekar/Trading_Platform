import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},

  openSellWindow: (uid) => {},
  closeSellWindow: () => {},

  orders: [],
  addOrder: (order) => {},
});

export const GeneralContextProvider = (props) => {

  // BUY
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  // SELL
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedSellStockUID, setSelectedSellStockUID] = useState("");

  // Orders
  const [orders, setOrders] = useState([]);


  // =========================
  // BUY
  // =========================

  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };


  // =========================
  // SELL
  // =========================

  const handleOpenSellWindow = (uid) => {
    setIsSellWindowOpen(true);
    setSelectedSellStockUID(uid);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedSellStockUID("");
  };


  // =========================
  // ORDERS
  // =========================

  const handleAddOrder = (order) => {
    setOrders((prevOrders) => [
      ...prevOrders,
      order,
    ]);
  };


  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,

        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,

        orders,
        addOrder: handleAddOrder,
      }}
    >

      {props.children}

      {isBuyWindowOpen && (
        <BuyActionWindow
          uid={selectedStockUID}
        />
      )}

      {isSellWindowOpen && (
        <SellActionWindow
          uid={selectedSellStockUID}
        />
      )}

    </GeneralContext.Provider>
  );
};

export default GeneralContext;