import express from "express";
import { getAllUsers, updateProfile, followUser, unfollowUser, getFollowers, getFollowing} from "../controllers/userController.js";
import { requireAuth } from "@clerk/express";
const userRouter = express.Router();

userRouter.post("/update-profile", requireAuth(), updateProfile);
userRouter.get("/list", getAllUsers);

userRouter.post("/follow", followUser);
userRouter.post("/unfollow", unfollowUser);
userRouter.get("/:clerkId/followers", getFollowers);
userRouter.get("/:clerkId/following", getFollowing);

export default userRouter;
