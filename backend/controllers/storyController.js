import uploadToImageKit from "../config/imagekitConfig.js";
import Story from "../models/storySchema.js";
import { clerkClient, getAuth } from "@clerk/express";

const getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json({ success: true, stories });
  } catch (error) {
    console.error("error in getStories controller: ", error.message);
    res.json({ success: false, message: error.message });
  }
};

const uploadMediaStory = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "file is not uploaded" });
    }

    const { userId } = getAuth(req);

    const user = await clerkClient.users.getUser(userId);

    // Convert buffer to Base64
    const fileBuffer = req.file.buffer.toString("base64");
    const fileName = req.file.originalname;

    const clerkUserId = user.id;

    // save to imagekit
    const mediaUrl = await uploadToImageKit(fileBuffer, fileName);

    // save url to mongodb
    const newStory = new Story({ clerkUserId, mediaUrl });
    await newStory.save();

    res.json({ success: true, message: "uploaded successfully" });
  } catch (error) {
    console.error("error in uploadMediaStory controller: ", error.message);
    res.json({ success: false, message: error.message });
  }
};

const uploadTextStory = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { text } = req.body;
    const { userId } = getAuth(req);

    console.log("text", text);

    const user = await clerkClient.users.getUser(userId);
    const newStory = new Story({ clerkUserId: user.id, text });
    await newStory.save();

    res.json({ success: true, message: "uploaded successfully" });
  } catch (error) {
    console.error("error in uploadTextStory controller: ", error.message);
    res.json({ success: false, message: error.message });
  }
};

export { uploadMediaStory, uploadTextStory, getStories };
