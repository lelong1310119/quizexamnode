import { Users } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ").pop();

    if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

    const decoded = jwt.verify(token, "YOUR_ACCESS_TOKEN_SECRET");
    if (!decoded)
      return res.status(400).json({ msg: "Invalid Authentication." });

      const user = await Users.findOne({ _id: decoded.id }).select('-password').lean();

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};