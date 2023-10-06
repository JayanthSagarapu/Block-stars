const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema({
  symbol: String,
  price: Number,
  timestamp: { type: Date, default: Date.now },
});

const Coin = mongoose.model("Coin", coinSchema);

module.exports = Coin;
