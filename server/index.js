import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import questionSetRoutes from './routes/questionSetRoutes.js';
import questionRoutes from "./routes/questionRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";


// Load environment variables and create an express app
dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();
// Middleware
app.use(
    cors({
      origin: ["http://localhost"],
      credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
    res.send("🛒 ShopSphere API is running!");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", authRoutes);
app.use("/api/question-sets", questionSetRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/users", userRoutes)


app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

