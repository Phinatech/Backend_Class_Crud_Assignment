import User from "../../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { gmail, password } = req.body;

  if (!gmail || !password) {
    return res.status(400).json({ message: "Please provide gmail and password" });
  }

  try {
    // Normalize email
    const user = await User.findOne({ gmail: gmail.toLowerCase() });

    if (!user) {
      return res.status(400).json({ message: "User not found. Please register first." });
    }

    const compared = await bcrypt.compare(password, user.password);
    if (!compared) {
      return res.status(401).json({ message: "Email or password is incorrect" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "fallbacksecret", {
      expiresIn: "5m"
    });

    return res
      .cookie("token", token, { httpOnly: true, sameSite: "strict" })
      .status(200)
      .json({ message: "Login successful", user, token });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
