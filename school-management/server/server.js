require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authroutes");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

// connectDB();
const dbConnect = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("DB connected");
    } catch (e) {
      console.error("Error connecting to MongoDB:", e.message);
    }
  };
  dbConnect();

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
