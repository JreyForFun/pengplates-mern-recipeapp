import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URL)
        console.log(`Database Connected: ${conn.connection.host} | ${conn.connection.name}`)
    } catch(e){
        console.error(e);
        process.exit(1);
    }
}