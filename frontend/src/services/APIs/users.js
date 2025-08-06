import { getIdToken } from "../auth";

const API_BASE = import.meta.env.VITE_BACKEND_URL 

export const createUserIfNotExists = async (firebaseUser) => {
  const token = await getIdToken();
  const res = await fetch(`${API_BASE}/users/create`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: firebaseUser }),
  });

  if (!res.ok) throw new Error("Failed to create/update user");
  return await res.json();
};


export const getUserActivity = async (userId) => {
  const token = await getIdToken();
  const res = await fetch(`${API_BASE}/users/activity/${userId}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch activity");
  return await res.json();
};

