import express from "express";
import { login } from "../controllers/auth.js"; // Importing the login controller

const router = express.Router();

router.post("/login", login); // Using the login controller
export default router;
