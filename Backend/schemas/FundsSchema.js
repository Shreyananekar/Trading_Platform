const { Schema } = require("mongoose");

const FundsSchema = new Schema({
  balance: {
    type: Number,
    default: 10000,
  },
});

module.exports = { FundsSchema };