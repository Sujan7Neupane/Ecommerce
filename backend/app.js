import "dotenv/config";
import express from "express";

import { connectDB } from "./src/db/dbConnection.js";
import userRouter from "./src/routes/userRouter.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); //middleware to parse body data to JSON object
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ecommece website" });
});

app.use("/api/auth", userRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The server is running in http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to database: ${err}`);
  });
