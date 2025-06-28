import jwt from "jsonwebtoken";
import userModel from "../models/userSchema.js"; // Adjust the path if needed

const authMiddleware = async (req, res, next) => {
  const accessToken = req.cookies?.token;
  const jwtSecret = process.env.JWT_SECRET;

  if (!accessToken) {
    return res.status(401).json({ message: "Please login first" });
  }

  try {
    const decoded = jwt.verify(accessToken, jwtSecret);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const verifiedUser = await userModel.findById(decoded.id).select("-password");

    if (!verifiedUser) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = verifiedUser;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default authMiddleware;
