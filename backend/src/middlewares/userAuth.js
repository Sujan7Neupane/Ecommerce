import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const checkAuth = async (req, res, next) => {
  const { jwtToken: token } = req.cookies;
  // console.log("token", token);

  if (!token) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // console.log(_id);

    const user = await User.findById(_id);
    // console.log("User:", user);

    req.user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    next();
  } catch (error) {
    res.json({ message: error.message });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const { isAdmin } = req.user;

    if (!isAdmin) return res.status(403).json({ message: "Authorized Access" });

    next();
  } catch (error) {
    res.json({ message: error.message });
  }
};

export { checkAuth, isAdmin };
