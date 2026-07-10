import jwt from "jsonwebtoken";

export const setToken = (_id, res) => {
  // console.log("env secret key: ", process.env.JWT_SECRET_KEY);

  const token = jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  // console.log("set token:", token);

  res.cookie("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: true,
    maxAge: 20 * 24 * 60 * 60 * 1000,
  });
};
