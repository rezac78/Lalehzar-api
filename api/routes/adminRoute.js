const express = require("express");
const { protect } = require("../middlewares/protect");
const {
  getAdminDashboard,
  updateAdmin,
} = require("../controllers/adminController");
const router = express.Router();

router.get("/information", protect, getAdminDashboard);
router.put("/update", protect, updateAdmin);

module.exports = router;
