const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const {
  addStory,
  getUserStories,
  getStoryById,
  updateStory,
  deleteStory,
} = require("../controllers/storyController");

router.post("/stories", verifyToken, ...addStory);
router.get("/stories", verifyToken, getUserStories);
router.get("/stories/:id", verifyToken, getStoryById);
router.put("/stories/:id", verifyToken, updateStory);
router.delete("/stories/:id", verifyToken, deleteStory);

module.exports = router;
