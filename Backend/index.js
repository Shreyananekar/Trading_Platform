require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const marketRoutes = require("./routes/marketRoutes");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { FundsModel } = require("./model/FundsModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/market", marketRoutes);


// ==============================
// HOLDINGS
// ==============================

app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch holdings",
      error: error.message,
    });
  }
});


app.get("/funds", async (req, res) => {
  try {
    let funds = await FundsModel.findOne();

    // Create initial funds if they don't exist
    if (!funds) {
      funds = new FundsModel({
        balance: 10000,
      });

      await funds.save();
    }

    const holdings = await HoldingsModel.find({});

    let usedMargin = 0;

    holdings.forEach((holding) => {
      usedMargin += holding.avg * holding.qty;
    });

    const availableCash = funds.balance - usedMargin;

    res.json({
      balance: funds.balance,
      usedMargin,
      availableCash,
    });

  } catch (error) {
    console.error("Error fetching funds:", error);

    res.status(500).json({
      message: "Failed to fetch funds",
    });
  }
});

app.post("/funds/add", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Invalid amount",
      });
    }

    let funds = await FundsModel.findOne();

    if (!funds) {
      funds = new FundsModel({
        balance: 10000,
      });
    }

    funds.balance += Number(amount);

    await funds.save();

    res.json({
      message: "Funds added successfully",
      balance: funds.balance,
    });

  } catch (error) {
    console.error("Add funds error:", error);

    res.status(500).json({
      message: "Failed to add funds",
    });
  }
});

app.post("/funds/withdraw", async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Invalid amount",
      });
    }

    const funds = await FundsModel.findOne();

    if (!funds) {
      return res.status(404).json({
        message: "Funds account not found",
      });
    }

    if (amount > funds.availableCash) {
      return res.status(400).json({
        message: "Insufficient available balance",
      });
    }

    funds.balance -= amount;
    funds.availableCash -= amount;

    await funds.save();

    res.json({
      message: "Funds withdrawn successfully",
      funds,
    });

  } catch (error) {
    console.error("Error withdrawing funds:", error);

    res.status(500).json({
      message: "Failed to withdraw funds",
    });
  }
});
// ==============================
// POSITIONS
// ==============================

app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch positions",
      error: error.message,
    });
  }
});


// ==============================
// CREATE ORDER
// ==============================

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    // ==============================
    // 1. SAVE ORDER
    // ==============================

    const newOrder = new OrdersModel({
      name,
      qty,
      price,
      mode,
    });

    await newOrder.save();


    // ==============================
    // 2. BUY
    // ==============================

    if (mode === "BUY") {

      // ---------- HOLDINGS ----------

      const existingHolding = await HoldingsModel.findOne({ name });

      if (existingHolding) {

        const oldQty = existingHolding.qty;
        const oldAvg = existingHolding.avg;

        const newQty = oldQty + qty;

        const newAvg =
          (oldQty * oldAvg + qty * price) / newQty;

        existingHolding.qty = newQty;
        existingHolding.avg = newAvg;
        existingHolding.price = price;

        await existingHolding.save();

      } else {

        const newHolding = new HoldingsModel({
          name,
          qty,
          avg: price,
          price: price,
          net: "0%",
          day: "0%",
        });

        await newHolding.save();
      }


      // ---------- POSITIONS ----------

      const existingPosition = await PositionsModel.findOne({ name });

      if (existingPosition) {

        const oldQty = existingPosition.qty;
        const oldAvg = existingPosition.avg;

        const newQty = oldQty + qty;

        const newAvg =
          (oldQty * oldAvg + qty * price) / newQty;

        existingPosition.qty = newQty;
        existingPosition.avg = newAvg;
        existingPosition.price = price;

        await existingPosition.save();

      } else {

        const newPosition = new PositionsModel({
          product: "CNC",
          name: name,
          qty: qty,
          avg: price,
          price: price,
          net: "0%",
          day: "0%",
          isLoss: false,
        });

        await newPosition.save();
      }
    }


    // ==============================
    // RESPONSE
    // ==============================

    res.status(201).json({
      message: "Order, holding and position saved successfully",
      order: newOrder,
    });

  } catch (error) {

    console.error("Order error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});
// ==============================
// GET ALL ORDERS
// ==============================

app.get("/orders", async (req, res) => {
  try {
    const orders = await OrdersModel.find({});

    console.log("Orders fetched:", orders);

    res.json(orders);

  } catch (error) {
    console.error("Error fetching orders:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});


app.get("/funds", async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({});

    let usedMargin = 0;

    holdings.forEach((holding) => {
      usedMargin += holding.avg * holding.qty;
    });

    const balance = 10000;

    const availableCash = balance - usedMargin;

    res.json({
      balance,
      usedMargin,
      availableCash,
    });

  } catch (error) {
    console.error("Error fetching funds:", error);

    res.status(500).json({
      message: "Failed to fetch funds",
    });
  }
});


// ==============================
// START SERVER
// ==============================


app.listen(PORT, async () => {
  console.log(`app started on port ${PORT}`);

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("DB connected!");

  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error.message);
  }
});