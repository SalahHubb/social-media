import mongoose from "mongoose";
import { type } from "os";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String, // clerk id
    },
    recipientId: {
      type: String, // clerk id
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("message", messageSchema);
