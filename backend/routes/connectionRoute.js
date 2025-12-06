import express from "express";
import {
  sendConnectionRequest,
  getPendingRequests,
  respondToConnectionRequest,
  listConnections,
} from "../controllers/connectionController.js";

const connectionRouter = express.Router();

connectionRouter.post("/request", sendConnectionRequest);
connectionRouter.get("/pending/:recipientId", getPendingRequests);
connectionRouter.post("/respond", respondToConnectionRequest);
connectionRouter.get("/list/:clerkId", listConnections);

export default connectionRouter;
