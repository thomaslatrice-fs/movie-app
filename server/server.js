require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");

connectDB();

const app = express();

app.use(cors());

// Chrome's Private Network Access check requires this explicit header
// for cross-origin requests from a browser page into localhost/private IPs.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Private-Network", "true");
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Movie Journal API is running.");
});

app.use("/api/v1/movies", movieRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
