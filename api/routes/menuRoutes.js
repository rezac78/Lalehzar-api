const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/protect");
const {
  createMenu,
  getAllMenu,
  updateMenu,
  deleteMenu,
  getMenuById,
  getAllHashtag,
} = require("../controllers/menuController");

// Example routes for menu
router.post("/", protect, createMenu);
router.get("/", getAllMenu);
router.get("/hashtag", getAllHashtag);
router.get("/:id", getMenuById);
router.put("/:id", protect, updateMenu);
router.delete("/:id", protect, deleteMenu);
module.exports = router;
