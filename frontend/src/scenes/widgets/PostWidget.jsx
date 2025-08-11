import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import FlexBetween from "components/FlexBetween"; // Ensure this path is correct and the component exists
import Friend from "../../components/Friend"; // Adjust the path based on your project structure
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "states";
import FlexStart from "components/FlexStart";
const API = process.env.REACT_APP_API;
const PostWidget = ({
  postId,
  postUserId,
  name,
  location,
  description,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComment, setIsComment] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user?._id); // Safely access user ID
  const isLiked = Boolean((likes || {})[loggedInUserId ?? ""]); // Check if the logged-in user has liked the post
  const likeCount = Object.keys(likes || {}).length; // Total number of likes

  const { palette } = useTheme();
  const primary = palette.primary.main;
  const main = palette.neutral.main;

  const patchLike = async () => {
    const response = await fetch(`${API}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        key={postUserId}
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${process.env.REACT_APP_API}/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexStart gap="0.5rem">
          <FlexStart gap="0">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexStart>
          <FlexStart style={{ gap: 0, alignItems: "center" }}>
            <IconButton onClick={() => setIsComment(!isComment)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments?.length || 0}</Typography>
          </FlexStart>
        </FlexStart>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComment && (
        <Box mt="0.5rem">
          {(comments ?? []).map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};
export default PostWidget;
