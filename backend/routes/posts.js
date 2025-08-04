import express from "express";
import { getFeedPosts, getUserPosts } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import { likePost } from "../controllers/posts.js"; // Import the likePost controller
const router = express.Router(); // Create a new router instance

//READ
router.get("/", verifyToken, getFeedPosts); // Get all posts from the feed
router.get("/:userId/posts", verifyToken, getUserPosts); // Get posts by a specific user

// UPDATE
router.patch("/:id/like", verifyToken, likePost); // Like a post by ID
export default router; // Export the router to be used in other parts of the application
