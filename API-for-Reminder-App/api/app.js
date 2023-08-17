import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import connectDB from "../config/db.js";
import routes from "./routes/index.js";
import model from "./models/index.js";

//this function creates a database connection
connectDB();

// console.log("check 0");
//this one is to start the express server
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//this imported function routes all the paths 
routes(app);
// console.log("check 1");

export default app;

