import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.firstName,
      location: user.location,
      description,
      picturePath,
      userPicturePath: user.picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    // Fetch all posts after creating a new post
    const post = await Post.find();

    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// READ
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params; // Extracting user ID from request parameters
    const posts = await Post.find({ userId }); // Finding posts by user ID
    res.status(200).json(posts); // Sending the user's posts as a response
  } catch (err) {
    res.status(404).json({ message: err.message }); // Handling errors and sending an error message
  }
};

// UPDATE

export const likePost = async (req, res) => {
  try {
    const { id } = req.params; // Extracting post ID from request parameters
    const { userId } = req.body;
    const post = await Post.findById(id); // Finding the post by ID
    const isLiked = post.likes.get(req.user.id); // Checking if the post is liked by the user

    if (isLiked) {
      post.likes.delete(userId); // If liked, remove the user's like
    } else {
      post.likes.set(userId, true); // If not liked, add the user's like
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true } // Return the updated post
    );

    res.status(200).json(updatedPost); // Sending the updated post as a response
  } catch (err) {
    res.status(404).json({ message: err.message }); // Handling errors and sending an error message
  }
};

export default { createPost, getFeedPosts, getUserPosts, likePost };
