import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/Messages/Sidebar";
import { getCookies } from "@/utils";
import ChatWindow from "@/components/Messages/ChatWindow";

const messages = () => {
    const [friendsList, setFriendsList] = useState([]);
    const token = getCookies('userData')?.token;
    useEffect(() => {
        (async () => {
            try {
                await axios.get('http://localhost:8000/api/request/accepted', {
                  headers:{
                      Authorization:  token
                  }
                }).then((res) => {
                  setFriendsList(res?.data?.friendsList?.friendsList)
                })  
              } catch (error) {
                  console.log('error during friend list', error.message);
              }
        })()
    },[])
    return (
        <div className="flex fixed bottom-0 left-0 w-full p-4" style={{height: '85vh'}}>
            <div className="w-3/12">
                <Sidebar friendsList={friendsList}/>
            </div>
            <div className="w-3/4" style={{border: '1px solid green'}}>
                <ChatWindow/>
            </div>
        </div>
    )
}

export default messages;