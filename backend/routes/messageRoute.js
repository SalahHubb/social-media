import express from "express";
import { requireAuth } from "@clerk/express";
import { getMessageList } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/:userId1/:userId2", getMessageList);

export default messageRouter;
