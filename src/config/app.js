const express = require("express");
const cors = require("cors");
const app = express();
const expenseRoute = require("../routes/expense.routes");
const userRoute = require("../routes/user.routes");
// middle ware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("application works");
});

app.use("/expense", expenseRoute);
app.use("/user", userRoute);

module.exports = app;
