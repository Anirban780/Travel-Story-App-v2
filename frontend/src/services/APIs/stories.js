import { getIdToken } from "../auth"; // path to your token util
import { getBackendUrl } from "../backend";

const API_BASE = await getBackendUrl();

export const addStory = async (story, userId) => {
  const token = await getIdToken();
  const res = await fetch(`${API_BASE}/stories/add`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ story, userId }),
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

export const updateStory = async (storyId, updatedData, userId) => {
  const token = await getIdToken();
  const res = await fetch(`${API_BASE}/stories/${storyId}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updatedData, userId }),
  });

  if (!res.ok) throw new Error("Failed to update story");
  return await res.json();
};

export const deleteStory = async (storyId, storyTitle = "Untitled", userId) => {
  const token = await getIdToken();
  const res = await fetch(`${API_BASE}/stories/${storyId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ storyTitle, userId }),
  });

  if (!res.ok) throw new Error("Failed to delete story");
  return await res.json();
};


export const toggleFavourite = async (story, userId) => {
  const token = await getIdToken();
  const API_BASE = await getBackendUrl();
  const res = await fetch(`${API_BASE}/stories/favourite/${story.id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,               // or use req.user.uid in backend
      isFavourite: !story.isFavourite,    // toggled value
      title: story.title || "Untitled",   // optional
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to toggle favourite");
  }

  return await res.json();
};



