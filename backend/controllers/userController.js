const { createUserIfNotExists, getRecentActivities } = require("../models/userModel");

const createUser = async (req, res) => {
  const { user } = req.body;
  try {
    await createUserIfNotExists(user);
    res.status(200).json({ message: "User created or updated." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserActivity = async (req, res) => {
  const { userId } = req.params;
  try {
    const activities = await getRecentActivities(userId);
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser, getUserActivity
}
