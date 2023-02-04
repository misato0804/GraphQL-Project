import mongoose from "mongoose";

const url = process.env.MONGO_DB!

const connectDB = async () => {
    const connect = await mongoose.connect(url);
    console.log(`Mongo DB Connected: ${connect.connection?.host}`);
}

export default connectDB;