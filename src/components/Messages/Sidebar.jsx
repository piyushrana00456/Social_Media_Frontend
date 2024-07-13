import { useRouter } from 'next/router';
import React from 'react';

const Sidebar = ({chats}) => {
  const router = useRouter();
  
  const handleClick = (id) => {
    router.push(`/messages?messageWith=${id}`, undefined, { shallow: true});
  }

  return (
    <div className="bg-gray-100 p-4 h-full">
      <div className="mb-2 h-90 overflow-y-auto">
        <h2 className="text-xl font-bold">Friends</h2>
        <div className="mt-2">
          {
            chats?.map((el) => (
                <div 
                className={`flex items-center p-2 rounded-md mb-2 shadow-sm cursor-pointer ${router.query.messageWith === el?.messagesWith ? "bg-slate-400" : "bg-white"}`} 
                onClick={() => handleClick(el?.messagesWith)}
                >
                    <div className="h-8 w-8 bg-red-500 rounded-full">
                        <img src={el?.profilePic}/>
                    </div>
                    <div className="ml-7">
                      <p className="font-semibold">{el?.name}</p>
                      <p className="text-gray-500 text-sm">
                        {el?.lastMessage?.length > 10 ? `${el?.lastMessage?.substring(0, 10)}...` : el?.lastMessage}
                      </p>
                    </div>
                </div>
            ))
          }
        </div>
      </div>
      <div className='h-10 flex justify-center items-center' style={{border: '1px solid gray'}}>
        <input 
          className='pl-2 h-full w-full pl-1 text-xl'
          placeholder='Search Friends'
        />
      </div>
    </div>
  );
};

export default Sidebar;
