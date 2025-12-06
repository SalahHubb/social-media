// here's a controller for managing connections between users
import Connection from "../models/connectionSchema.js";
import User from "../models/userSchema.js";

// we'll handle pending, accepted, and rejected connection requests

// send connection request
const sendConnectionRequest = async (req, res) => {
  try {
    const { requesterId, recipientId } = req.body;

    if (!requesterId || !recipientId) {
      return res.status(400).json({ success: false, message: "Missing ids" });
    }

    // Don't allow self-request
    if (requesterId === recipientId) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot connect to yourself" });
    }

    // Check for existing connection (in either direction)
    const existing = await Connection.findOne({
      $or: [
        { requesterId, recipientId },
        { requesterId: recipientId, recipientId: requesterId },
      ],
    });

    if (existing) {
      if (existing.status === "pending") {
        return res.json({ success: false, message: "Request already pending" });
      }
      if (existing.status === "accepted") {
        return res.json({ success: false, message: "Already connected" });
      }
    }

    const conn = await Connection.create({
      requesterId,
      recipientId,
      status: "pending",
    });

    return res.json({ success: true, message: "Connection request sent" });
  } catch (error) {
    console.error("Error sending connection request:", error);
    return res.json({ success: false, message: "Server Error" });
  }
};

// Get pending requests for a recipient
// Get api/connection/pending/:recipientId
const getPendingRequests = async (req, res) => {
  try {
    const { recipientId } = req.params;

    if (!recipientId) {
      return res.status(400).json({ success: false, message: "Missing id" });
    }

    // fetch all connection in which the status is pending and my id is receiverId
    const pending = await Connection.find({
      recipientId,
      status: "pending",
    }).lean();

    const otherIds = pending.map((c) => c.requesterId);
    const uniqueOtherIds = [...new Set(otherIds)];

    // fetch user info from user collection based on these ids
    const users = await User.find({ clerkId: { $in: uniqueOtherIds } }).lean();

    return res.status(200).json({ success: true, pendingUsers: users });
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    return res.json({ success: false, message: "Server Error" });
  }
};

// Respond to a connection request (accept/reject)
// body: {requesterId, recipientId, action}

const respondToConnectionRequest = async (req, res) => {
  try {
    const { requesterId, recipientId, action } = req.body;
    if (!requesterId || !recipientId || !action) {
      return res.json({ success: false, message: "Missing data" });
    }
    if (!["accept", "reject"].includes(action)) {
      return res.json({ success: false, message: "Invalid action" });
    }

    const connection = await Connection.findOne({
      requesterId,
      recipientId,
      status: "pending",
    });

    if (!connection) {
      return res.json({ success: false, message: "No pending request found" });
    }

    connection.status = action === "accept" ? "accepted" : "rejected";
    await connection.save();

    // add recipient into following of requester's following array if accepted
    if (action === "accept") {
      await User.updateOne(
        { clerkId: requesterId },
        { $addToSet: { following: recipientId } }
      );

      // add requester into followers of recipient's followers array if accepted
      await User.updateOne(
        { clerkId: recipientId },
        { $addToSet: { followers: requesterId } }
      );
    }

    return res.json({ success: true, message: `Request ${action}ed` });
  } catch (error) {
    console.error("Error responding to connection request:", error);
    return res.json({ success: false, message: "Server Error" });
  }
};

// list connections for a user
// GET api/connection/list/:clerkId
const listConnections = async (req, res) => {
  try {
    const { clerkId } = req.params;
    if (!clerkId) {
      return res.status(400).json({ success: false, message: "Missing id" });
    }

    const conns = await Connection.find({
      status: "accepted",
      $or: [{ requesterId: clerkId }, { recipientId: clerkId }],
    }).lean();

    // map to other user ids
    const otherIds = conns.map((c) =>
      c.requesterId === clerkId ? c.recipientId : c.requesterId
    );

    const uniqueOtherIds = [...new Set(otherIds)];
    const users = await User.find({ clerkId: { $in: uniqueOtherIds } }).lean();

    return res.json({ success: true, connections: users });
  } catch (err) {
    console.error("listConnections err:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export {
  sendConnectionRequest,
  getPendingRequests,
  respondToConnectionRequest,
  listConnections,
};
