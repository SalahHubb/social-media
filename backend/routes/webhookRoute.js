import express from "express";
import handleWebhook from "../controllers/webhookController.js";

const webhookRouter = express.Router();

webhookRouter.post(
  "/",
  express.raw({ type: "application/json" }),
  handleWebhook
);

export default webhookRouter;
