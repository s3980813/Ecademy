import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import questionSetRoutes from './routes/questionSetRoutes.js';
import questionRoutes from "./routes/questionRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import testResultRoutes from "./routes/testResultRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables and create an express app
dotenv.config();
const app = express();
const PORT = process.env.PORT || 80;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
    cors({
      origin: true, // Allow all origins in production
      credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", authRoutes);
app.use("/api/question-sets", questionSetRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/test-results", testResultRoutes);
app.use("/api/users", userRoutes);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

