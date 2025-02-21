import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import { connectDB } from "./config/db";
import { sequelize } from "./config/db";

import cookieSession from 'cookie-session';

dotenv.config();

const app = express();
app.set('trust proxy', 1);
connectDB();

app.use(morgan('dev'));

app.use(express.json());

app.use(cors());

app.use(
    cookieSession({
        signed: false,
        secure: false,
    })
);

app.use(authRoutes);

sequelize.sync().then(() => {
    console.log("Database synchronized");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));