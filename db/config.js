import { config } from 'dotenv';
config();

import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI is not defined in the environment variables.");
}

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB!");
  } catch (err) {
    console.error("Connection error", err);
    process.exit();
  }
};

export default connectToMongoDB;
