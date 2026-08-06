import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

app.get('/', (req,res) => {
    res.send('Server is ready ')
})

app.listed(PORT, () => {
    connectDB()
    console.log(`Server is running at ${PORT}`)
})