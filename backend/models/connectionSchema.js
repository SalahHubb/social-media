import mongoose, { Schema } from "mongoose";

const connectionSchema = new mongoose.Schema({
  requesterId: {
    type: String, // clerkId
  },
  recipientId: {
    type: String, // clerkId
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
  },
});

export default mongoose.model("connection", connectionSchema);
