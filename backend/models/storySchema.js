import mongoose, { Schema } from "mongoose";

const storySchema = new mongoose.Schema(
  {
    clerkId: { type: String },
    mediaUrl: {
      type: String,
    },
    text: { type: String },
    date: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("story", storySchema);
