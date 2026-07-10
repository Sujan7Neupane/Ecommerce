import { User } from "../models/user.models.js";
import { setToken } from "../utils/jwtToken.js";

const registerUser = async (req, res) => {
  try {
    // NOTE: isAdmin -> dangerous to pass from body
    // TODO: Later make a seed.js file
    const { fullName, email, password, isAdmin } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    const registeredUser = await User.create({
      fullName,
      email,
      password,
      isAdmin,
    });

    res
      .status(201)
      .json({ message: "User registered successfully!", registeredUser });
  } catch (error) {}
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.send({
      message: "Users fetched successfully!",
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdminUser = async (req, res) => {
  try {
    const admin = await User.find({ isAdmin: true });

    res.json({ message: "Admin User fetched successfully!", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    // console.log(existingUser);

    const isMatching = await existingUser.comparePassword(password);

    if (!isMatching) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    setToken(existingUser._id, res);

    return res.status(200).json({
      message: "User logged in successfully!",
      user: {
        id: existingUser._id,
        email: existingUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { registerUser, getAllUsers, getAdminUser, loginUser };
