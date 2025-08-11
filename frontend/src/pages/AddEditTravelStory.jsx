import React, { useState } from 'react';
import { uploadImage } from '../services/cloudinary';
import { addStory, updateStory } from '../services/APIs/stories';
import { toast } from 'react-toastify';
import AddPost from '../components/AddPost';

const AddEditTravelStory = ({
  type,
  storyInfo,
  onClose,
  fetchStories,
  userId
}) => {
  const [title, setTitle] = useState(storyInfo?.title || "");
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null);
  const [story, setStory] = useState(storyInfo?.story || "");
  const [visitedLocation, setVisitedLocation] = useState(storyInfo?.visitedLocation || []);
  const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddOrUpdateClick = async () => {
    // Client-side form validation
    if (!title) { 
      const msg = "Please enter the title";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!story) { 
      const msg = "Please enter the story";
      setError(msg);
      toast.error(msg);
      return;
    }

    setError("");
    setLoading(true);

    let imageUrl = storyInfo?.imageUrl || "";
    if (storyImg && typeof storyImg === "object") {
      try {
        imageUrl = await uploadImage(storyImg);
      } catch (err) {
        const msg = "Image upload failed. Please try again.";
        setError(msg, err);
        toast.error(msg);
        setLoading(false);
        return;
      }
    }

    const storyData = {
      title,
      story,
      imageUrl,
      visitedLocation,
      visitedDate: visitedDate ? new Date(visitedDate).getTime() : Date.now(),
      userId,
      isFavourite: storyInfo?.isFavourite || false,
    };

    try {
      if (type === "add") {
        await addStory(storyData, userId);
        toast.success("Story added successfully");
      } else {
        await updateStory(storyInfo.id, storyData, userId);
        toast.success("Story updated successfully");
      }

      // Always refetch so UI stays in sync
      await fetchStories();
      onClose();
    } catch (err) {
      // Capture backend error message if available
      const backendMsg = err?.response?.data?.error || err.message || "An unknown error occurred";
      const msg = `Failed to save story: ${backendMsg}`;
      setError(msg);
      toast.error(msg);
      console.error("Save story error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative'>
      <div className='flex items-center justify-between'>
        <h5 className='text-xl font-medium text-slate-700'>
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>
        <button onClick={onClose}>✕</button>
      </div>

      <AddPost
        title={title} setTitle={setTitle}
        storyImg={storyImg} setStoryImg={setStoryImg}
        story={story} setStory={setStory}
        visitedLocation={visitedLocation} setVisitedLocation={setVisitedLocation}
        visitedDate={visitedDate} setVisitedDate={setVisitedDate}
        error={error}
      />

      <button
        className='btn-primary mt-4 w-full'
        onClick={handleAddOrUpdateClick}
        disabled={loading}
      >
        {loading 
          ? (type === "add" ? "Adding..." : "Updating...") 
          : (type === "add" ? "Add Story" : "Update Story")}
      </button>
    </div>
  );
};

export default AddEditTravelStory;
