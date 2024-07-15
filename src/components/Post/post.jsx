import { useState } from 'react';
import { MdOutlineAddPhotoAlternate, MdEvent, MdOutlineLocationOn, MdOutlineVideoCall, MdOutlineModeEdit } from "react-icons/md";


const PostCreationComponent = ({
content,
setContent,
media,
setMedia,
mediaType,
handleContentChange,
handleMediaChange,
renderMediaPreview,
handleCreatePost,
...props
}) => {
  
  return (
    <div className="w-full p-4 border rounded-md shadow-sm">
      <div className='relative'>
        <textarea
            placeholder="Write something..."
            className="w-full px-[2.5rem] py-3 border rounded-md"
            value={content}
            onChange={handleContentChange}
        />
        <span className='absolute left-3 top-4 text-xl text-blue-400'>
           <MdOutlineModeEdit/>
        </span>
      </div>
      <div className="flex justify-between mt-2">
        <label className="cursor-pointer flex flex-col items-center">
          <input type="file" name="photo" className="hidden" onChange={handleMediaChange} />
          <MdOutlineAddPhotoAlternate/>
          <span className="text-xs">Photo</span>
        </label>
        <label className="cursor-pointer flex flex-col items-center">
          <input type="file" name="video" className="hidden" onChange={handleMediaChange} />
          <MdOutlineVideoCall/>
          <span className="text-xs">Video</span>
        </label>
        <label className="cursor-pointer flex flex-col items-center">
          <MdEvent/>  
          <span className="text-xs">Event</span>
        </label>
        <label className="cursor-pointer flex flex-col items-center">
          <MdOutlineLocationOn/>
          <span className="text-xs">Location</span>
        </label>
      </div>
     {renderMediaPreview () && (
         <div className="mt-4">
         <h3 className="text-lg font-semibold">Post Preview</h3>
         <div className="border p-2 rounded-md mt-2">
           <p>{content}</p>
           {renderMediaPreview()}
         </div>
       </div>
     )}
     <button
        onClick={handleCreatePost}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Post
      </button>
    </div>
  );
};

export default PostCreationComponent;
