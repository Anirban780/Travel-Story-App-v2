const storyModel = require("../models/storyModel");
const { addUserActivity } = require("../models/userModel");

const addStory = async (req, res) => {
  const { story, userId } = req.body;

  try {
    const exists = await storyModel.findStoryByTitle(userId, story.title);
    if (!exists.empty) {
      return res.status(400).json({ error: "Story with this title already exists." });
    }

    const storyRef = await storyModel.addStory({ ...story, userId });

    await addUserActivity(userId, {
      type: "add",
      storyId: storyRef.id,
      storyTitle: story.title,
    });

    res.status(201).json({ id: storyRef.id, ...story });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getStories = async (req, res) => {
  const { userId } = req.params;
  try {
    const stories = await storyModel.getUserStories(userId);
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateStory = async (req, res) => {
  const { storyId } = req.params;
  const { updatedData, userId } = req.body;

  try {
    await storyModel.updateStoryById(storyId, updatedData);

    await addUserActivity(userId, {
      type: "edit",
      storyId,
      storyTitle: updatedData.title,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteStory = async (req, res) => {
  const { id } = req.params;
  const { userId, storyTitle = "Untitled" } = req.body;

  try {
    await storyModel.deleteStoryById(id);

    await addUserActivity(userId, {
      type: "delete",
      storyId: id,
      storyTitle,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const toggleFavourite = async (req, res) => {
  const { storyId } = req.params;
  const { userId, isFavourite, title } = req.body;

  try {
    await storyModel.updateFavouriteStatus(storyId, isFavourite);

    await addUserActivity(userId, {
      type: isFavourite ? "favourite" : "unfavourite",
      storyId,
      storyTitle: title || "Untitled Story",
    });

    res.status(200).json({
      success: true,
      message: `Story ${isFavourite ? "added to" : "removed from"} favourites.`,
    });
  } catch (err) {
    console.error("Error toggling favourite:", err);
    res.status(500).json({ error: "Failed to toggle favourite." });
  }
};


module.exports = {
  addStory, updateStory, getStories, deleteStory, toggleFavourite
}

