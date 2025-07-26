import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";

export const addStory = (story) => 
    addDoc(collection(db, "stories"), story);

export const getStories = async (userId) => {
  const q = query(collection(db, "stories"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateStory = (id, data) => 
    updateDoc(doc(db, "stories", id), data);

export const deleteStory = (id) => deleteDoc(doc(db, "stories", id));