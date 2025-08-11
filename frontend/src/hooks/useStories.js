import { useEffect, useState } from "react";
import { getStories, addStory, updateStory, deleteStory, toggleFavourite } from "../services/APIs/stories";

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

  const toggleStoryFavourite = async (story) => {
    // Optimistic update - update UI immediately
    setStories(prev => prev.map(s => 
      s.id === story.id ? { ...s, isFavourite: !s.isFavourite } : s
    ));
    
    try {
      // Update backend
      await toggleFavourite(story, userId);
    } catch (error) {
      // Revert on error
      setStories(prev => prev.map(s => 
        s.id === story.id ? { ...s, isFavourite: !s.isFavourite } : s
      ));
      throw error;
    }
  };

  useEffect(() => {
    if (userId) fetchStories(userId);
  }, [userId]);

  return { 
    stories, 
    loading, 
    fetchStories, 
    addStory, 
    updateStory, 
    deleteStory, 
    toggleStoryFavourite 
  };
}