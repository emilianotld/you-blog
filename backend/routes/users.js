import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router(); // Define a new router instance

// READ
router.get("/:id", verifyToken, getUser); // Get user by ID with token verification
router.get("/:id/friends", verifyToken, getUserFriends); // Get user's friends with token verification

// UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriend); // Add or remove a friend with token verification
export default router; // Export the router to be used in other parts of the application
