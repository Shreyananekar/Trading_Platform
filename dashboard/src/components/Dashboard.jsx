import React from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";

import AddFunds from "./AddFunds";
import WithdrawFunds from "./WithdrawFunds";
import Commodity from "./Commodity";

const Dashboard = () => {
  return (
    <div className="dashboard-container">

      {/* Watchlist */}
      <WatchList />

      <div className="content">
        <Routes>
          <Route path="/" element={<Summary />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/holdings" element={<Holdings />} />

          <Route path="/positions" element={<Positions />} />

          <Route path="/funds" element={<Funds />} />

          <Route path="/funds/add" element={<AddFunds />} />

          <Route path="/funds/withdraw" element={<WithdrawFunds />} />

          <Route path="/commodity" element={<Commodity />} />

          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>

    </div>
  );
};

export default Dashboard;