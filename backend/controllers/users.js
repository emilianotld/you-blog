import User from "../models/User.js";

// READ
export const getUser = async (req, res) => {
  try {
    const { id } = req.params; // Extracting user ID from request parameters
    const user = await User.findById(id); // Finding the user by ID in the database
    res.status(200).json(user); // Sending the user data as a response
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id); // Finding the user by ID
    if (!user || !Array.isArray(user.friends)) {
      return res
        .status(404)
        .json({ message: "User or friends list not found" });
    }
    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId)) // Fetching all friends' data
    );
    const formattedFriends = friends
      .filter((friend) => friend) // Filter out any null or undefined friends
      .map(({ _id, firstName, lastName, occupation, picturePath }) => {
        // Formatting friends' data
        return { _id, firstName, lastName, occupation, picturePath };
      });
    res.status(200).json(formattedFriends); // Sending updated friends list as a response
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    const isFriend = user.friends.includes(friendId);

    if (isFriend) {
      user.friends = user.friends.filter((fid) => fid.toString() !== friendId);
      friend.friends = friend.friends.filter((fid) => fid.toString() !== id);
    } else {
      if (!user.friends.includes(friendId)) user.friends.push(friendId);
      if (!friend.friends.includes(id)) friend.friends.push(id);
    }

    // Deduplicate manually just in case
    user.friends = Array.from(
      new Set(user.friends.map((fid) => fid.toString()))
    );
    friend.friends = Array.from(
      new Set(friend.friends.map((fid) => fid.toString()))
    );

    await user.save();
    await friend.save();

    // Populate + format like getUserFriends
    const updatedUser = await User.findById(id);
    const friendsData = await Promise.all(
      updatedUser.friends.map((fid) => User.findById(fid))
    );

    const formattedFriends = friendsData
      .filter(Boolean)
      .map(({ _id, firstName, lastName, occupation, picturePath }) => ({
        _id,
        firstName,
        lastName,
        occupation,
        picturePath,
      }));

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
