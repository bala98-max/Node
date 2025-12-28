const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = require("./app");
dotenv.config();

const PORT = process.env.PORT;
const dB_Url = process.env.MONGO_URI;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Optional: quick hint for DB connection (uncomment and set MONGO_URI in .env)
mongoose
  .connect(dB_Url)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
