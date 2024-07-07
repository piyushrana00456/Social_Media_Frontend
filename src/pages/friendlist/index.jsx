import { useState, useEffect } from "react";
import FriendList from "@/components/FriendList";
import axios from 'axios';
import { getCookies } from "@/utils";

const FriendsPage = () => {
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
            console.log({friendsList:res?.data?.friendsList});
            setFriendsList(res?.data?.friendsList)
          })  
        } catch (error) {
            console.log('error during friend list', error.message);
        }
    }
      
    useEffect(() => {
        fetchFriendData();
        friendList();
    },[]); 
  return (
    <div>
      <FriendList
        pendingRequests={pendingRequests}
        friendRequests={friendRequests}
        acceptedFriends={friendsList.friendsList}
      />
    </div>
  );
};

export default FriendsPage;
