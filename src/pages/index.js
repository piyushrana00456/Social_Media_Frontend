import { useState } from 'react';
import axios from 'axios';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import PrivateRoute from "@/components/PrivateRoute"
import PostCreation from "@/components/Post/post";
import Sidebar from "@/components/Post/sideBar";
import Network from "@/components/Post/network";
import { getCookies } from '@/utils';
import uploadPictures from "@/utils/uploadPictures";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Oval } from 'react-loader-spinner';

const Home = () => {
  const {token, profilePic, username} = getCookies('userData');

  const queryClient = useQueryClient();

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


  const fetchPosts = async ({ pageParam = 0 }) => {
    const res = await axios.get(`http://localhost:8000/api/post/get`,{
      headers:{
        Authorization:  token,
        pageNumber: pageParam
     }
    });
    return res.data;
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery('posts', fetchPosts, {
    getNextPageParam: (lastPage, pages) => lastPage.nextPage ?? false,
  });

  const createPostMutation = useMutation(
    (newPost) => axios.post('http://localhost:8000/api/post/create', newPost,{
      headers:{
        Authorization:  token
     }
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
      },
    }
  );

  const handleCreatePost = async () => {
    let pictureUrl = await uploadPictures(media)
    const dataToSend = {
      text: content,
      pictureUrl
    }
    createPostMutation.mutate(dataToSend);
    setContent('');
    setMedia(null);
    setMediaType('');
  };

  return (
    <div className="w-full flex py-[6rem] px-[3.5rem] h-screen">
      <div className="w-1/4 h-full">
        <Sidebar/>
      </div>
      <main className="flex-1 flex flex-col p-4 overflow-y-auto">
        <PostCreation
          content={content}
          setContent={setContent}
          media={media}
          setMedia={setMedia}
          mediaType={mediaType}
          handleContentChange={handleContentChange}
          handleMediaChange={handleMediaChange}
          renderMediaPreview={renderMediaPreview}
          handleCreatePost={handleCreatePost}
        />
        <InfiniteScroll
          dataLength={data?.pages.length || 0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<Oval color="#00BFFF" height={80} width={80} />}
          endMessage={<p style={{ textAlign: 'center' }}>Yay! You have seen it all</p>}
        >
          {data?.pages.map((page) =>
            page?.posts?.map((post) =>
              <div key={post.id} className="bg-white p-5 rounded shadow-lg mb-5">
                <div className="flex items-center mb-3">
                  <img src={profilePic} alt={username} className="w-10 h-10 rounded-full mr-3" />
                  <h3 className="text-lg font-bold">{username}</h3>
                </div>
                <img src={post.pictureUrl} alt={post.text} className="w-full rounded mb-3" />
                <p>{post.text}</p>
              </div>
            )
          )}
        </InfiniteScroll>
      </main>
      <div className="w-1/4 h-full">
        <Network/>
      </div>
    </div>
  );
}

const HomePage  = () =>{
  return (
    <PrivateRoute>
      <Home/>
   </PrivateRoute>
  )
}

export default HomePage
