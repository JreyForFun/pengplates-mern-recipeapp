import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRouter from './routes/auth.route.js';
import recipeRouter from './routes/recipes.route.js';
dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/recipes', recipeRouter)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running at ${PORT}`)
})