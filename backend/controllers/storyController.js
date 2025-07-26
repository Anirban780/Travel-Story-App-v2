const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { db } = require("../config/firebase");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Add a story with image
const addStory = [
  upload.single("image"),
  async (req, res) => {
    const { title, story, visitedLocation, visitedDate } = req.body;
    const userId = req.user.uid;

    try {
      if (!req.file) return res.status(400).json({ error: "Image required" });

      const cloudinaryResult = await uploadToCloudinary(req.file.buffer);

      const newStory = {
        title,
        story,
        visitedLocation,
        imageUrl: cloudinaryResult.secure_url,
        visitedDate: new Date(visitedDate),
        userId,
        createdAt: new Date(),
      };

      const doc = await db.collection("travel_stories").add(newStory);
      res.status(201).json({ id: doc.id, ...newStory });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Get user’s stories
const getUserStories = async (req, res) => {
  const userId = req.user.uid;
  try {
    const snapshot = await db.collection("travel_stories")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    const stories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(stories);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get story by ID
const getStoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await db.collection("travel_stories").doc(id).get();
    if (!doc.exists) return res.status(404).json({ error: "Not found" });
    res.json({ id: doc.id, ...doc.data() });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update story
const updateStory = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.uid;
  const { title, story, visitedLocation, visitedDate } = req.body;

  try {
    const docRef = db.collection("travel_stories").doc(id);
    const doc = await docRef.get();
    if (!doc.exists || doc.data().userId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await docRef.update({ title, story, visitedLocation, visitedDate });
    res.json({ message: "Story updated" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete story
const deleteStory = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.uid;

  try {
    const docRef = db.collection("travel_stories").doc(id);
    const doc = await docRef.get();
    if (!doc.exists || doc.data().userId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await docRef.delete();
    res.json({ message: "Story deleted" });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addStory,
  getUserStories,
  getStoryById,
  updateStory,
  deleteStory,
};
