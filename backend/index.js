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

// ✅ Enable CORS
app.use(cors({
    origin: [
        "http://localhost:5173",        // local frontend
        "https://conversa-sand.vercel.app/login" // replace with your actual Vercel URL
    ],
    credentials: true,  // allow cookies / auth headers
}))

app.use(express.json());
app.use(cookieParser())

// ✅ API routes
app.use('/api/auth', authRouter)
app.use('/api/message', messageRouter)
app.use('/api/user', userRouter)

// ✅ Serve frontend (if needed when backend also serves build)
app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

const PORT = process.env.PORT || 3000;
dbConnect();

server.listen(PORT, () => {
    console.log(`Working at ${PORT}`);
})
