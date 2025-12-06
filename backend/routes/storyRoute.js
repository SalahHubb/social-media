import express from "express";
import upload from "../middlewares/multer.js";
import { requireAuth } from "@clerk/express";
import {
  uploadMediaStory,
  uploadTextStory,
  getStories,
} from "../controllers/storyController.js";

const storyRouter = express.Router();

storyRouter.get("/list", getStories);

storyRouter.post(
  "/media",
  requireAuth(),
  upload.single("media"),
  uploadMediaStory
);
storyRouter.post("/text", requireAuth(), uploadTextStory);

export default storyRouter;
