import jwt from "jsonwebtoken";
import Users from "../models/user";
require("dotenv").config();

const checkUserAuth = async (req, res, next) => {
  try {
    const authorization = req.header("Authorization");
    if (!authorization) {
      return res.status(401).json({
        success: false,
        error: "Invalid Authentication",
      });
    }
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET ?? "");
    let find = await Users.findOne({ _id: decoded._id }, { password: 0 });
    if (find) {
      req.user = find;
      next();
    } else {
      return res.status(400).json({
        success: false,
        error: "Invalid Token",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export default checkUserAuth;
