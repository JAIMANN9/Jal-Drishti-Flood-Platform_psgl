import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectionDB.js";
import userRoutes from "./routes/User.route.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
// console.log("Environment:", PORT);
const allowedOrigins = ["http://localhost:5173/", "http://localhost:5173"];

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);



app.use(express.json());
app.use(cookieParser());
// Routes
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/user", userRoutes);
// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});