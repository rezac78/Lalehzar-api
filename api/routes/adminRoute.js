const express = require("express");
const { protect } = require("../middlewares/protect");
const {
  getAdminDashboard,
  updateAdmin,
  updateEmailAdmin,
  GetOpening,
  UpdateOpening,
} = require("../controllers/adminController");
const router = express.Router();

router.get("/information", protect, getAdminDashboard);
router.put("/update", protect, updateAdmin);
router.put("/updateEmail", protect, updateEmailAdmin);
router.get("/opening-hours", GetOpening);
router.put("/opening-hours", protect, UpdateOpening);

module.exports = router;
