import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app=express();




app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

import AuthRouter from "./routes/auth.route.js"
import ResumeRouter from "./routes/resume.route.js"
import UserRouter from "./routes/user.route.js"


app.use('/api/auth',AuthRouter);
app.use('/api/resume',ResumeRouter);
app.use('/api/user',UserRouter)



app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
        success:false,
        message: err.message || "Internal Server Error"
    });
});
export default app;
