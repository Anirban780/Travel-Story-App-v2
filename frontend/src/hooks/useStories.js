import { useEffect, useState } from "react";
import { getStories, addStory, updateStory, deleteStory } from "../services/db";

export default function useStories(userId) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = async (userId) => {
    setLoading(true);
    const data = await getStories(userId);
    setStories(data);
    setLoading(false);
  };

  useEffect(() => {
    if (userId) fetchStories();
  }, [userId]);

  return { stories, loading, fetchStories, addStory, updateStory, deleteStory };
}