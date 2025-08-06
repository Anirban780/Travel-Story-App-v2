import { getIdToken } from "../auth"; // path to your token util

const API_BASE = import.meta.env.VITE_BACKEND_PROD_URL || import.meta.env.VITE_BACKEND_URL;

export const addStory = async (story) => {
  const token = await getIdToken();
  const res = await fetch(`${API_BASE}/stories/add`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ story }),
  });

  if (!res.ok) throw new Error("Failed to add story");
  return await res.json();
};

export const getStories = async (userId) => {
  const token = await getIdToken();
  const res = await fetch(`${API_BASE}/stories/${userId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch stories");
  return await res.json();
};

export const updateStory = async (storyId, updatedData) => {
  const token = await getIdToken();
  const res = await fetch(`${API_BASE}/stories/${storyId}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updatedData }),
  });

  if (!res.ok) throw new Error("Failed to update story");
  return await res.json();
};

export const deleteStory = async (storyId, storyTitle = "Untitled") => {
  const token = await getIdToken();
  const res = await fetch(`${API_BASE}/stories/${storyId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ storyTitle }),
  });

  if (!res.ok) throw new Error("Failed to delete story");
  return await res.json();
};


export const toggleFavourite = async (story) => {
  const token = await getIdToken();

  const res = await fetch(`${API_BASE}/stories/favourite/${story.id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: story.userId,               // or use req.user.uid in backend
      isFavourite: !story.isFavourite,    // toggled value
      title: story.title || "Untitled",   // optional
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to toggle favourite");
  }

  return await res.json();
};



