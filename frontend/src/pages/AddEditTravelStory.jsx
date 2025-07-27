import React, { useState } from 'react';
import { uploadImage } from '../services/cloudinary';
import { addStory, updateStory } from '../services/db';
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
    if (!title) { setError("Please enter the title"); return; }
    if (!story) { setError("Please enter the story"); return; }
    setError("");
    setLoading(true);

    let imageUrl = storyInfo?.imageUrl || "";
    if (storyImg && typeof storyImg === "object") {
      try {
        imageUrl = await uploadImage(storyImg);
      } catch {
        setError("Image upload failed");
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
        await addStory(storyData);
        toast.success("Story Added Successfully");
      } else {
        await updateStory(storyInfo.id, storyData);
        toast.success("Story Updated Successfully");
      }
      fetchStories();
      onClose();
    } catch (err) {
      setError("Failed to save story. Please try again.", err);
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
        
        <button className='' onClick={onClose}>✕</button>
        
      </div>

      <AddPost
        title={title} setTitle={setTitle}
        storyImg={storyImg} setStoryImg={setStoryImg}
        story={story} setStory={setStory}
        visitedLocation={visitedLocation} setVisitedLocation={setVisitedLocation}
        visitedDate={visitedDate} setVisitedDate={setVisitedDate}
        error={error}
      />
      
      <button className='btn-primary mt-4 w-full' onClick={handleAddOrUpdateClick} disabled={loading}>
        {loading ? (type === "add" ? "Adding..." : "Updating...") : (type === "add" ? "Add Story" : "Update Story")}
      </button>

    </div>
  );
};

export default AddEditTravelStory;
