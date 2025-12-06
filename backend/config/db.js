import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.MONGODB_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("connected to mongodb");
  } catch (error) {
    console.log("mongodb connection failed: ", error.message);
  }
};

const DisconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("disconnected from mongodb");
  } catch (error) {
    console.log("mongodb disconnection failed: ", error.message);
  }
};

export { connectToDB, DisconnectDB };
