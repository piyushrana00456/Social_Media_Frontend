import { useState, useEffect } from "react";
import FriendList from "@/components/FriendList";
import axios from 'axios';
import { getCookies } from "@/utils";

const FriendsPage = ({onlineFriendsList}) => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friendsList, setFriendsList] = useState([]);
    const token = getCookies('userData')?.token;
    const fetchFriendData = async () => {
        try {
          await axios.get('http://localhost:8000/api/request/pending', {
            headers:{
                Authorization:  token
            }
          }).then((res) => {
              setPendingRequests(res?.data?.friendsRequestSent)
              setFriendRequests(res?.data?.friendsRequestReceived)
          })
        } catch (error) {
          console.log('error during pending request', error.message);
        }
    }
    
    const friendList = async () => {
        try {
          await axios.get('http://localhost:8000/api/request/accepted', {
            headers:{
                Authorization:  token
            }
          }).then((res) => {
            setFriendsList(res?.data?.friendsList)
          })  
        } catch (error) {
            console.log('error during friend list', error.message);
        }
    }
   const removeSentRequest = async (userData) => {
    const userIdToCancelReq = userData?.user?._id
    try {
      await axios.delete(`http://localhost:8000/api/request/cancel/${userIdToCancelReq}`, {
        headers:{
          Authorization:  token
      }
      }).then(() => {
        fetchFriendData();
      })
    } catch (error) {
      console.log('error during canceling sent request', error.message);
    }
   } 
   const rejectRequest = async (userData) => {
    const userIdToReject = userData?.user?._id
    try {
      await axios.delete(`http://localhost:8000/api/request/reject/${userIdToReject}`, {
        headers:{
          Authorization:  token
      }
      }).then(() => {
        fetchFriendData();
      })
    } catch (error) {
      console.log('error during canceling sent request', error.message);
    }
   }   
    useEffect(() => {
        fetchFriendData();
        friendList();
    },[]); 

    const acceptFriendReques = async (userData) => {
      const userIdToAdd = userData?.user?._id
        try {
          await axios.get(`http://localhost:8000/api/request/add/${userIdToAdd}`, {
            headers:{
              Authorization:  token
          }
          })
        } catch (error) {
          console.log('error during add API', error.message); 
        }  
    }
  return (
    <div>
      <FriendList
        pendingRequests={pendingRequests}
        friendRequests={friendRequests}
        acceptedFriends={friendsList.friendsList}
        acceptFriendReques={acceptFriendReques}
        removeSentRequest={removeSentRequest}
        rejectRequest={rejectRequest}
        onlineFriendsList={onlineFriendsList}
      />
    </div>
  );
};

export default FriendsPage;
