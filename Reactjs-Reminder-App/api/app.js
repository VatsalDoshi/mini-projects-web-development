import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/index.js';
import model from './models/index.js';

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/tododbs');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
routes(app);

export default app;