import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const connectDb = () => {
  const db = mongoose.connect(process.env.MONGO_URL);
  if (db) {
    console.log("mongodb connected");
  } else {
    console.log("mongodb not connected");
  }
};
connectDb();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`port listened on ${port}`);
});
