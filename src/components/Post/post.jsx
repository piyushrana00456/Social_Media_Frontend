import { useState } from 'react';
import { MdOutlineAddPhotoAlternate, MdEvent, MdOutlineLocationOn, MdOutlineVideoCall, MdOutlineModeEdit } from "react-icons/md";


const PostCreationComponent = () => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState('');

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);
    setMediaType(e.target.name);
  };

  const renderMediaPreview = () => {
    if (!media) return null;

    if (mediaType === 'photo') {
      return <img src={URL.createObjectURL(media)} alt="Preview" className="w-full h-64 object-cover mt-2" />;
    } else if (mediaType === 'video') {
      return (
        <video controls className="w-full h-64 mt-2">
          <source src={URL.createObjectURL(media)} type={media.type} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return null;
    }
  };

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
    </div>
  );
};

export default PostCreationComponent;
