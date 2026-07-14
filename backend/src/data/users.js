import "dotenv/config";
import bcrypt from "bcrypt";

// console.log(process.env.ADMIN_EMAIL);

export const users = [
  {
    fullName: "admin",
    email: process.env.ADMIN_EMAIL,
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
    isAdmin: true,
  },
  {
    fullName: "Dummy User",
    email: process.env.DUMMY_USER_EMAIL,
    password: bcrypt.hashSync(process.env.DUMMY_USER_PASSWORD, 10),
    isAdmin: false,
  },
];
