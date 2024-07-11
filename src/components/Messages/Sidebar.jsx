import React from 'react';

const Sidebar = ({friendsList}) => {
  return (
    <div className="bg-gray-100 p-4 h-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Friends</h2>
        <div className="mt-2">
          {
            friendsList?.map(({user}) => (
                <div className="flex items-center p-2 bg-white rounded-md mb-2 shadow-sm cursor-pointer">
                    <div className="h-8 w-8 bg-red-500 rounded-full">
                        <img src={user.profilePic}/>
                    </div>
                    <div className="ml-4">
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-gray-500 text-sm">last message...</p>
                    </div>
                </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
