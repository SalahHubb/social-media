import Message from "../models/messageSchema.js";

// chat history between two users
const getMessageList = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    // Note: these params are clerk IDs

    const messages = await Message.find({
      $or: [
        { senderId: userId1, recipientId: userId2 },
        { senderId: userId2, recipientId: userId1 },
      ],
    }).sort({ createdAt: 1 }); // oldest first

    res.json({ success: true, messages });
  } catch (error) {
    console.log("error in getMessageList controller: ", error.message);
  }
};

export { getMessageList };
