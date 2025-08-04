import { Token } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import { use } from "react";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      // Update the user and token on login
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      // Reset the user and token to null on logout
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      // Update the friends list of the user
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      // Update the posts in the state
      // Set the posts in the state
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      // Update a specific post in the state
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post; // Replace with the updated post
        }
        return post; // Return the original post if no match
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
