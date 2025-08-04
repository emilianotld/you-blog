import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER USER
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt();
    //applying bcrypt to hash the password
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash, //hashed password
      picturePath,
      friends: [],
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGGING IN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password); // comparing the password with the hashed password
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        msg: "JWT_SECRET is not defined in the environment variables.",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // creating a token
    delete user.password; // removing the password from the user object before sending it
    res.status(200).json({ token, user }); // sending the token and user data as a response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export default { register, login };
