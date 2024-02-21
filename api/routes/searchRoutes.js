const express = require("express");
const router = express.Router();
const { PartSearch } = require("../controllers/searchController");

router.get("/", PartSearch);

module.exports = router;
