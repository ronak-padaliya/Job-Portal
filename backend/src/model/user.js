import { ObjectId, Schema, model } from "mongoose";

const pageSchema = new Schema(
  {
    user_name: { type: String, default: "", required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    is_company: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
const Users = model("user", pageSchema);
export default Users;
