const User = require("../models/User");
const xssFilters = require("xss-filters");
const generateToken = require("../../utils/tokenGenerator");
exports.register = async (req, res) => {
  try {
    const email = xssFilters.inHTMLData(req.body.email);
    const username = xssFilters.inHTMLData(req.body.username);
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or username already exists",
      });
    }
    const sanitizedUserData = {
      ...req.body,
      email,
      username,
    };
    const user = await User.create(sanitizedUserData);
    const token = generateToken(user);
    res.status(201).json({
      success: true,
      message: "User successfully created",
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  const email = xssFilters.inHTMLData(req.body.email);
  const password = xssFilters.inHTMLData(req.body.password);
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "کاربر وارد نشده.",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "ایمیل یا رمز اشتباه است" });
    }
    const token = generateToken(user);
    res.status(200).json({
      success: true,
      message: "خوش آمدید",
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};