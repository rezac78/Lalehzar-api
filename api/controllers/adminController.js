const User = require("../models/User");
const Cafe = require("../models/Cafe");

exports.getAdminDashboard = async (req, res) => {
  try {
    const user = await User.findOne({ role: "admin" });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
exports.updateAdmin = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    if (password) {
      user.password = password;
      user.markModified("password");
    }
    await user.save();
    res.status(201).json({ message: "با موفقیت اپدیت شد", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user", success: false });
  }
};
exports.updateEmailAdmin = async (req, res) => {
  const { userId, email } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    user.email = email;
    await user.save();
    res.status(201).json({ message: "با موفقیت اپدیت شد", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user", success: false });
  }
};
exports.GetOpening = async (req, res) => {
  try {
    const cafe = await Cafe.findOne();
    res.json(cafe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.UpdateOpening = async (req, res) => {
  const { regularHours, specialHours } = req.body;
  try {
    let cafe = await Cafe.findOne();
    if (!cafe) {
      cafe = new Cafe({});
    }
    cafe.regularHours = regularHours;
    cafe.specialHours = specialHours;
    await cafe.save();
    res
      .status(200)
      .json({ message: "با موفقیت اپدیت شد", success: true, cafe });
  } catch (error) {
    res.status(500).json({ message: "خطا رخ داده", success: false });
  }
};
