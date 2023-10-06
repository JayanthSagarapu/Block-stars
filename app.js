const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const coinRoutes = require("./Routes/routes");
app.use("/", coinRoutes);

const PORT = 3000;
app.use(express.static("public"));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/coinPriceTracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log("Server running");
});
