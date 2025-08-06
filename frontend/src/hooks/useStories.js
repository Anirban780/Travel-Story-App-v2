import { useEffect, useState } from "react";
import { getStories, addStory, updateStory, deleteStory } from "../services/APIs/stories";

export default function useStories(userId) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStories = async (userId) => {
    if(!userId) return;
    
    setLoading(true);
    const data = await getStories(userId);
    setStories(data);
    setLoading(false);
  };

  useEffect(() => {
    if (userId) fetchStories(userId);
  }, [userId]);

  return { stories, loading, fetchStories, addStory, updateStory, deleteStory };
}