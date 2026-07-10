import "dotenv/config";
import express from "express";
import { connectDB } from "./src/db/dbConnection.js";

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ecommece website" });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The server is running in http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to database: ${err}`);
  });
