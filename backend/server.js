import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.js";
import todoRouter from "./routes/todo.js";
import cors from 'cors';
import { verifyToken } from './middlewares/verifyToken.js';


dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Allow cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());
connectDb();

app.use("/api/v1/auth", authRouter); // your auth routes
app.use("/api/v1/todos", verifyToken, todoRouter); // your protected todos

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
