import express, { json } from "express";
import cors from "cors";
import { connect } from "mongoose";
import { routes } from "./routes/auth.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const connectDb = () => {
  try {
    const db = connect(process.env.MONGO_URL);
    if (db) {
      console.log("mongodb connected");
    } else {
      console.log("mongodb not connected");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
app.use(json());
app.use(cors());
app.use("/api", routes);
connectDb();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`port listened on ${port}`);
});
