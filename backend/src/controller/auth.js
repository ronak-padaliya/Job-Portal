import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import Users from "../model/user.js";
import dotenv from "dotenv";
dotenv.config();

const signUp = async (req, res) => {
  try {
    const { user_name, email, password, is_company } = req.body;
    if (!user_name && !email && !password) {
      let requireField = Object.keys(req.body).find(
        (item) => !req.body[item] && item
      );
      res
        .status(404)
        .json({ success: false, message: `${requireField} is require` });
      return;
    }
    const isUserExist = await Users.findOne({ email });
    if (isUserExist) {
      res
        .status(401)
        .json({ success: false, message: "Users is already exist" });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await Users.create({
      user_name,
      email,
      password: hashPassword,
      is_company: is_company ?? false,
    });
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Successfully" });
  }
};
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      let requireField = Object.keys(req.body).find(
        (item) => !req.body[item] && item
      );
      res
        .status(403)
        .json({ success: false, message: `${requireField} is require` });
      return;
    }
    const isUserExist = await Users.findOne({ email });

    if (!isUserExist) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    const isPasswordValid = bcrypt.compareSync(password, isUserExist?.password);
    if (!isPasswordValid) {
      res.status(400).json({ success: false, message: "Invalid password" });
      return;
    }
    const token = jwt.sign(
      { _id: isUserExist._id },
      process.env.JWT_SECRET ?? ""
    );

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token,
      user: isUserExist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { signIn, signUp };
