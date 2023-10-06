const axios = require("axios");
const Coin = require("../Models/model");

function roundingPrice(price) {
  return price.toFixed(2);
}

const events = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendPriceData = async () => {
    try {
      const coin = await Coin.findOne({ symbol: "BTC" }).sort({
        timestamp: -1,
      });

      if (coin) {
        const roundedPrice = roundingPrice(coin.price);
        res.write(`data: ${roundedPrice}\n`);
      }
    } catch (error) {
      console.error(error);
      res.write("data: error\n");
    }
  };

  sendPriceData();

  const intervalId = setInterval(sendPriceData, 5000);

  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
};

const getPrice = async (req, res) => {
  try {
    const coin = await Coin.findOne({ symbol: "BTC" }).sort({
      timestamp: -1,
    });

    if (coin) {
      const roundedPrice = roundingPrice(coin.price);
      res.status(200).json({ success: true, price: roundedPrice });
    } else {
      res.status(404).json({ success: false, error: "Coin not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const updatePrice = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );

    const newCoin = new Coin({
      symbol: "BTC",
      price: data.bitcoin.usd,
    });

    await newCoin.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  events,
  getPrice,
  updatePrice,
};
