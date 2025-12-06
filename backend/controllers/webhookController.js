import { verifyWebhook } from "@clerk/express/webhooks";
import User from "../models/userSchema.js";

const handleWebhook = async (req, res) => {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;

    if (
      eventType === "user.created" ||
      eventType === "user.updated" ||
      eventType === "session.created"
    ) {
      console.log("clerk ", eventType);

      const { id, first_name, last_name, username, profile_image_url } =
        evt.data;

      // Upsert: update if exists, create if not
      await User.findOneAndUpdate(
        { clerkId: id },
        {
          clerkId: id,
          username: username || `@${first_name}_${last_name}`,
          firstName: first_name,
          imageUrl: profile_image_url,
          // we can upsert other user data
        },
        { upsert: true, new: true }
      );
    }

    console.log("user synced to mongodb");
    return res.json({ success: true, message: "webhook received" });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).send("Error verifying webhook");
  }
};

export default handleWebhook;
