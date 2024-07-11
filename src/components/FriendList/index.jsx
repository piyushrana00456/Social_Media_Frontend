import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';

const FriendList = ({ pendingRequests, friendRequests, acceptedFriends, acceptFriendReques,removeSentRequest }) => {
  const [showPending, setShowPending] = useState(true);
  const [showRequests, setShowRequests] = useState(true);
  const [showAccepted, setShowAccepted] = useState(true);
  console.log({pendingRequests, friendRequests});
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Friend List</h1>

      <div className="space-y-6">
        {/* Pending Requests */}
        <div className="bg-white p-6 rounded shadow-md">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowPending(!showPending)}>
            <h2 className="text-xl font-semibold">Pending Requests</h2>
            {showPending ? <FaChevronUp className="w-6 h-6" /> : <FaChevronDown className="w-6 h-6" />}
          </div>
          {showPending && (
            <ul className="mt-4 space-y-4">
              {pendingRequests.map((friend) => (
                <li key={friend?.user?._id} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
                    {friend?.user?.profilePic ? <div><img src={friend?.user?.profilePic}/></div> : <FiUser className="w-6 h-6 text-gray-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-medium">{friend?.user?.name}</div>
                    <div className="text-sm text-gray-500">2 hours ago</div>
                  </div>
                  <div className='flex'>
                     <div className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => removeSentRequest(friend)}>Cancel</div> 
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Friend Requests */}
        <div className="bg-white p-6 rounded shadow-md">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowRequests(!showRequests)}>
            <h2 className="text-xl font-semibold">Friend Requests</h2>
            {showRequests ? <FaChevronUp className="w-6 h-6" /> : <FaChevronDown className="w-6 h-6" />}
          </div>
          {showRequests && (
            <ul className="mt-4 space-y-4">
              {friendRequests.map((friend) => (
                <li key={friend?.user?.id} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
                  {friend?.user?.profilePic ? <div><img src={friend?.user?.profilePic}/></div> : <FiUser className="w-6 h-6 text-gray-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-medium">{friend?.user?.name}</div>
                    <div className="text-sm text-gray-500">1 day ago</div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => acceptFriendReques(friend)}>Accept</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Reject</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Accepted Friends */}
        <div className="bg-white p-6 rounded shadow-md">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowAccepted(!showAccepted)}>
            <h2 className="text-xl font-semibold">Accepted Friends</h2>
            {showAccepted ? <FaChevronUp className="w-6 h-6" /> : <FaChevronDown className="w-6 h-6" />}
          </div>
          {showAccepted && (
            <ul className="mt-4 space-y-4">
              {acceptedFriends?.map((friend) => (
                <li key={friend?.user?._id} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
                    {friend?.user?.profilePic ? <div><img src={friend?.user?.profilePic}/></div> : <FiUser className="w-6 h-6 text-gray-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-medium">{friend?.user?.name}</div>
                  </div>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Message</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendList;
