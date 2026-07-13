import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";

import { connectDB } from "./src/db/dbConnection.js";
import userRouter from "./src/routes/userRouter.js";
import categoryRouter from "./src/routes/categoryRouter.js";
import productRouter from "./src/routes/productRouter.js";
import orderRouter from "./src/routes/orderRouter.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); //middleware to parse body data to JSON object
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ecommece website" });
});

app.use("/api/auth", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The server is running in http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to database: ${err}`);
  });
