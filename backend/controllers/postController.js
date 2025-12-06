import Post from "../models/postSchema.js";
import { clerkClient, getAuth } from "@clerk/express";
import uploadToImageKit from "../config/imagekitConfig.js";

const createPost = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    const { text } = req.body;

    // check if the user uses an image
    let mediaUrl = null;
    if (req.file) {
      // Convert buffer to Base64
      const fileBuffer = req.file.buffer.toString("base64");
      const fileName = req.file.originalname;
      mediaUrl = await uploadToImageKit(fileBuffer, fileName);
    }

    const user = await clerkClient.users.getUser(userId);

    const newPost = new Post({
      clerkId: user.id,
      text,
      mediaUrl,
    });

    const post = await newPost.save();

    return res.json({ success: true, message: "post created", post });
  } catch (error) {
    console.log("error in create post controller: ", error.message);
    return res.json({ success: false, message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.json({ success: true, posts });
  } catch (error) {
    console.log("error in get posts controller: ", error.message);
    return res.json({ success: false, message: error.message });
  }
};

export { createPost, getPosts };
