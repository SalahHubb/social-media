import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    clerkId: { type: String },
    text: { type: String },
    mediaUrl: { type: String },
    likeCount: { type: Number },
    shareCount: { type: Number },
    commentCount: { type: Number },
    date: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("post", postSchema);
