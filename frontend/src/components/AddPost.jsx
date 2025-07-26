// AddPost.jsx
import React from 'react'
import DateSelector from './Input/DateSelector';
import ImageSelector from './Input/ImageSelector';
import TagInput from './Input/TagInput';

const AddPost = ({
  title, setTitle,
  storyImg, setStoryImg,
  story, setStory,
  visitedLocation, setVisitedLocation,
  visitedDate, setVisitedDate,
  error,
}) =>{
  return (
    <div className='flex-1 flex flex-col gap-2 pt-4'>
      <label className='input-label'>TITLE</label>
      <input
        type="text"
        className='text-2xl text-slate-950 outline-none'
        placeholder='Your Blog Title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />

      <div className='my-3'>
        <DateSelector date={visitedDate} setDate={setVisitedDate} />
      </div>

      <ImageSelector
        image={storyImg}
        setImage={setStoryImg}
        handleDeleteImg={() => setStoryImg(null)}
      />

      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>STORY</label>
        <textarea
          className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
          placeholder='Your Story'
          rows={10}
          value={story}
          onChange={({ target }) => setStory(target.value)}
        />
      </div>

      <div className='pt-3'>
        <label className='input-label'>VISITED LOCATIONS</label>
        <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
      </div>
      
      {error && <p className='text-red-500 text-xs pt-2 text-right'>{error}</p>}
    </div>
  );
}

export default AddPost;

  