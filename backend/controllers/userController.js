import User from "../models/userSchema.js";
import { getAuth } from "@clerk/express";

//
//
const updateProfile = async (req, res) => {
  try {
    const { bio, location } = req.body;

    const { userId } = getAuth(req);

    // find by clerkId and update
    const updated = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        bio,
        location,
      },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    res.json({ success: true, message: "profile updated" });
  } catch (error) {
    console.log("error in updateProfile controller: ", error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.json({ success: true, users });
  } catch (error) {
    console.log("error in getAllUsers controller: ", error.message);
  }
};

// POSt api/user/follow
const followUser = async (req, res) => {
  try {
    const { followerId, targetUserId } = req.body;

    if (!followerId || !targetUserId) {
      return res.json({
        success: false,
        message: "missing followerId or targetUserId",
      });
    }

    if (followerId === targetUserId) {
      return res.json({
        success: false,
        message: "user cannot follow themselves",
      });
    }

    await User.updateOne(
      { clerkId: followerId },
      { $addToSet: { following: targetUserId } }
    );
    await User.updateOne(
      { clerkId: targetUserId },
      { $addToSet: { followers: followerId } }
    );

    res.json({ success: true, message: "followed successfully" });
  } catch (error) {
    console.log("error in followUser controller: ", error.message);
  }
};

// POST /api/user/unfollow
const unfollowUser = async (req, res) => {
  try {
    const { followerId, targetUserId } = req.body;

    if (!followerId || !targetUserId) {
      return res.status(400).json({ success: false, message: "Missing ids" });
    }

    await User.updateOne(
      { clerkId: followerId },
      { $pull: { following: targetUserId } }
    );
    await User.updateOne(
      { clerkId: targetUserId },
      { $pull: { followers: followerId } }
    );

    return res.json({ success: true, message: "Unfollowed" });
  } catch (err) {
    console.error("unfollowUser err:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/user/:clerkId/followers
const getFollowers = async (req, res) => {
  try {
    const { clerkId } = req.params;
    const me = await User.findOne({ clerkId });
    if (!me) {
      return res.json({ success: false, message: "User not found" });
    }

    const followers = await User.find({
      clerkId: { $in: me.followers || [] },
    }).lean();

    res.json({ success: true, followers });
  } catch (error) {
    console.error("getFollowers error:", error);
    res.json({ success: false, message: "Server error" });
  }
};

// GET /api/user/:clerkId/following
const getFollowing = async (req, res) => {
  try {
    const { clerkId } = req.params;
    const me = await User.findOne({ clerkId });
    if (!me) {
      return res.json({ success: false, message: "User not found" });
    }
    const following = await User.find({
      clerkId: { $in: me.following || [] },
    }).lean();

    res.json({ success: true, following });
  } catch (error) {
    console.error("getFollowing error:", error);
    res.json({ success: false, message: "Server error" });
  }
};

export {
  updateProfile,
  getAllUsers,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
};
