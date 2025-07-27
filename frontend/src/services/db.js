import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, getDoc, setDoc, serverTimestamp, orderBy, limit } from "firebase/firestore";

export const addStory = async (story, userId) => {
  const q = query(
    collection(db, "stories"),
    where("userId", "==", userId),
    where("title", "==", story.title)
  );
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    throw new Error("A story with this title already exists.");
  }

  const storyRef = await addDoc(collection(db, "stories"), {
    ...story,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  await addUserActivity(userId, {
    type: "add",
    storyId: storyRef.id,
    storyTitle: story.title,
  });

  return { id: storyRef.id, ...story }; // Return the new story
};


export const getStories = async (userId) => {
  if (!userId) return [];

  const q = query(collection(db, "stories"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateStory = async (storyId, updatedData, userId) => {
  await updateDoc(doc(db, "stories", storyId), {
    ...updatedData,
    updatedAt: serverTimestamp(),
  });

  await addUserActivity(userId, {
    type: "edit",
    storyId,
    storyTitle: updatedData.title,
  });
}

export const deleteStory = async (id, userId, storyTitle = "Untitled") => {
  // 1. Delete the story
  await deleteDoc(doc(db, "stories", id));

  // 2. Log the activity
  await addUserActivity(userId, {
    type: "delete",
    storyId: id,
    storyTitle,
  });
};


export const createUserIfNotExists = async (user) => {
  if (!user?.uid) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  const username = user.displayName || user.email?.split("@")[0] || "anonymous";
  const profilePic = user.photoURL || "";
  const email = user.email || "";

  if (!userSnap.exists()) {
    // Create user doc
    await setDoc(userRef, { username, email, profilePic });
  } else {
    // ✅ If profilePic is missing in existing doc, update it
    const existing = userSnap.data();
    if (!existing.profilePic && profilePic) {
      await updateDoc(userRef, { profilePic });
    }
  }
};

export const addUserActivity = async (userId, { type, storyId, storyTitle }) => {
  try {
    const activityRef = collection(db, "users", userId, "activity");

    const snapshot = await getDocs(query(activityRef, orderBy("createdAt", "desc")));
    const existing = snapshot.docs;

    if (existing.length >= 50) {
      const last = existing[existing.length - 1];
      await deleteDoc(last.ref);
    }

    await addDoc(activityRef, {
      type,
      storyId,
      storyTitle,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn("Failed to log activity for user:", userId, err.message);
  }
};

export const getRecentActivities = async (userId) => {
  const q = query(
    collection(db, "users", userId, "activity"),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    visitedDate: doc.data().timestamp?.toDate() || null, // ensure it's Date object
  }));
};
