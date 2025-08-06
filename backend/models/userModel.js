const { db, admin } = require("../config/firebase");

const createUserIfNotExists = async (user) => {
  const userRef = db.collection("users").doc(user.uid);
  const userSnap = await userRef.get();

  const username = user.displayName || user.email?.split("@")[0] || "anonymous";
  const profilePic = user.photoURL || "";
  const email = user.email || "";

  if (!userSnap.exists) {
    await userRef.set({ username, email, profilePic });
  } else {
    const existing = userSnap.data();
    if (!existing.profilePic && profilePic) {
      await userRef.update({ profilePic });
    }
  }
};

const addUserActivity = async (userId, { type, storyId, storyTitle }) => {
  const activityRef = db.collection("users").doc(userId).collection("activity");
  const snapshot = await activityRef.orderBy("createdAt", "desc").get();

  if (snapshot.size >= 50) {
    const last = snapshot.docs[snapshot.size - 1];
    await last.ref.delete();
  }

  await activityRef.add({
    type,
    storyId,
    storyTitle,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
};

const getRecentActivities = async (userId) => {
  const q = db.collection("users").doc(userId).collection("activity")
    .orderBy("createdAt", "desc")
    .limit(10);

  const snapshot = await q.get();
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

module.exports = {
  createUserIfNotExists,
  addUserActivity,
  getRecentActivities,
};
