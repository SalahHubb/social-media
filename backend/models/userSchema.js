import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // basic info synced from clerk
  clerkId: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  username: { type: String },
  imageUrl: { type: String },

  // social media specific fields
  bio: {
    type: String,
    default:
      "🌍 Dreamer | 📚 Learner | 🚀 Doer Exploring life one step at a time. ✨ Staying curious. Creating with purpose.",
  },
  location: { type: String },
  coverPhoto: { type: String, default: "" },
  followers: { type: Array },
  following: { type: Array },
});

export default mongoose.model("user", userSchema);
