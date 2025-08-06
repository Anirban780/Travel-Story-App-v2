const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/add", authenticate, storyController.addStory);
router.get("/:userId", authenticate, storyController.getStories);
router.put("/:storyId", authenticate, storyController.updateStory);
router.delete("/:id", authenticate, storyController.deleteStory);
router.put("/favourite/:storyId", authenticate, storyController.toggleFavourite);

module.exports = router;
