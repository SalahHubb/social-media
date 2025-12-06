import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import { requireAuth } from "@clerk/express";
import upload from "../middlewares/multer.js";

const postRouter = express.Router();

postRouter.post("/create", requireAuth(), upload.single("image"), createPost);
postRouter.get("/list", getPosts);

export default postRouter;
