const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const jobRoutes = require("./routes/jobRoutes");
const adminRoutes = require('./routes/adminRoutes');
const mongoose = require("mongoose");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/jobs", jobRoutes);
app.use('/api/admin', adminRoutes);

app.get("/", (req, res) => {
  res.send("LocalLink Backend is Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`You port is running on http://localhost:${PORT}`);
});
