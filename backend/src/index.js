import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "mongoose";
import { routes } from "./routes/route";

doconfig();

const app = express();
const connectDb = () => {
  const db = connect(process.env.MONGO_URL);
  console.log(process.env.MONGO_URL);
  if (db) {
    console.log("mongodb connected");
  } else {
    console.log("mongodb not connected");
  }
};

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
};
corsOptions.credentials = true;
app.use(json());
app.use(cors(corsOptions));
// console.log(name);
app.use("/api", routes);
connectDb();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`port listened on ${port}`);
});
