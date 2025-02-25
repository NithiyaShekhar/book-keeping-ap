const User = require("../models/User"); // Ensure you have a User model
const asyncHandler = require("express-async-handler");

const forgotPasswordController = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Generate reset token (mocked)
  const resetToken = "mocked-reset-token"; // Replace with actual token logic

  // Normally, send this via email (mocked)
  console.log(`Reset link: https://your-frontend.com/reset-password/${resetToken}`);

  res.status(200).json({ message: "Reset link sent to email" });
});

module.exports = { forgotPasswordController };
