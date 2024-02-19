const Menu = require("../models/Menu");
const sanitizeInput = require("../../utils/sanitizeInput");
// Create a new menu
exports.createMenu = async (req, res) => {
  try {
    const sanitizedBody = Object.keys(req.body).reduce((acc, key) => {
      acc[key] = sanitizeInput(req.body[key]);
      return acc;
    }, {});
    const menu = await Menu.create(sanitizedBody);
    res.status(201).json({
      success: true,
      message: "ساخته شد",
      data: menu,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
// Get all menu
exports.getAllMenu = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json({ success: true, data: menus });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
// Update a menu by ID
exports.updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!menu) {
      return res
        .status(404)
        .json({ success: false, error: "ایتمی با این ایدی یافت نشد" });
    }
    res
      .status(200)
      .json({ success: true, message: "اپدیت شد", data: menu });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something is wrong",
      error: error.message,
    });
  }
};
// Delete a menu by ID
exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      return res
        .status(404)
        .json({ success: false, message: "ایتمی با این ایدی یافت نشد" });
    }
    res.status(200).json({ success: true, message: "پاک شد" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
