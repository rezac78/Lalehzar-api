const Menu = require("../models/Menu");
// searchController.js
exports.PartSearch = async (req, res) => {
  const searchTerm = req.query.term;
  try {
    let searchResults = await Menu.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { hashtags: { $regex: searchTerm, $options: "i" } },
      ],
    });
    searchResults = searchResults.filter(
      (item) =>
        item.hashtags &&
        item.hashtags.filter((tag) => tag.trim() !== "").length > 0
    );
    res.status(201).json({
      success: true,
      message: "search successfully",
      data: searchResults,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error searching courses", error: error.message });
  }
};
