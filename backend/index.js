import express from "express"
import dotenv from 'dotenv'
import dbConnect from "./DB/dbConnect.js";
import authRouter from  './rout/authUser.js'
import messageRouter from './rout/messageRout.js'
import userRouter from './rout/userRout.js'
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";   // ✅ Add cors
import { app, server } from './Socket/socket.js'

const __dirname = path.resolve();

dotenv.config();


const allowedOrigins = [
  "http://localhost:5173",              // local dev
  "https://conversa-sand.vercel.app"    // your deployed frontend
];

app.use(cors({
  origin: ["*"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.options("*", cors()); // handle preflight


app.use((req, res, next) => {
  console.log("Incoming request from:", req.headers.origin);
  next();
});



app.use(express.json());
app.use(cookieParser())

// ✅ API routes
app.use('/api/auth', authRouter)
app.use('/api/message', messageRouter)
app.use('/api/user', userRouter)


const PORT = process.env.PORT || 3000;
dbConnect();

server.listen(PORT, () => {
    console.log(`Working at ${PORT}`);
})
