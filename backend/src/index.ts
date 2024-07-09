import express, { Request, Response } from "express";
import chalk from "chalk";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoutes from './routes/MyUserRoute';
import myRestaurantRoutes from './routes/MyRestaurantRoute';
import { v2 as cloudinary } from 'cloudinary';

mongoose
    .connect(process.env.MONGODB_CONNECTION_URI as string)
    .then(() => console.log(chalk.hex('#00ff00').bold(`<--- DATABASE CONNECTED SUCCESSFULLY --->`)));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
    res.send({ message: "Health OK! :)" });
});

app.use("/api/my/user", myUserRoutes);
app.use("/api/my/restaurant", myRestaurantRoutes);

app.listen(7000, () => {
    console.log(chalk.hex('#00ff00').bold(`<--- SERVER RUNNING AT PORT 7000 --->`));
});