const { db, admin } = require("../config/firebase");

const storiesCollection = db.collection("stories");

const findStoryByTitle = async (userId, title) => {
  const snapshot = await storiesCollection
    .where("userId", "==", userId)
    .where("title", "==", title)
    .get();
  return snapshot;
};

const addStory = async (storyData) => {
  return await storiesCollection.add({
    ...storyData,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
};

const getUserStories = async (userId) => {
  const snapshot = await storiesCollection.where("userId", "==", userId).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const updateStoryById = async (id, updatedData) => {
  return await storiesCollection.doc(id).update({
    ...updatedData,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
};

const deleteStoryById = async (id) => {
  return await storiesCollection.doc(id).delete();
};

const updateFavouriteStatus = async (storyId, isFavourite) => {
  const storyRef = db.collection("stories").doc(storyId);

  await storyRef.update({
    isFavourite,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
};

module.exports = {
  findStoryByTitle,
  addStory,
  getUserStories,
  updateStoryById,
  deleteStoryById,
  updateFavouriteStatus
};
