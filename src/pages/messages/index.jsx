import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Sidebar from "@/components/Messages/Sidebar";
import { getCookies } from "@/utils";
import ChatWindow from "@/components/Messages/ChatWindow";

const messages = () => {
    const [friendsList, setFriendsList] = useState({
        list:[],
        selectedUserId: null,
    });
    const [chats, setChats] = useState([]);
    const socket = useRef();
    const user = getCookies('userData');

    useEffect(() => {

        if(!socket.current){
            socket.current = io(process.env.NEXT_PUBLIC_BASE_URL);
        }

        (async () => {
            try {
                await axios.get('http://localhost:8000/api/request/accepted', {
                  headers:{
                      Authorization:  user?.token
                  }
                }).then((res) => {
                    const list = res?.data?.friendsList?.friendsList;
                  setFriendsList({list: list, selectedUserId: list[0]?.user?._id || null })
                })  
              } catch (error) {
                  console.log('error during friend list', error.message);
              }
        })()
    },[]);

    useEffect(() => {
        socket.current.emit("loadMessages", {
            token: user.token,
            messagesWith: friendsList.selectedUserId || null,
        })

        socket.current.on("noMessagesFound", () => {
            console.log("inside no message")
        })

        socket.current.on("messagesFound", ({userChats}) => {
            console.log({userChats});
        })
    }, [])
    return (
        <div className="flex fixed bottom-0 left-0 w-full p-4" style={{height: '85vh'}}>
            <div className="w-3/12">
                <Sidebar friendsList={friendsList?.list || []}/>
            </div>
            <div className="w-3/4" style={{border: '1px solid green'}}>
                <ChatWindow/>
            </div>
        </div>
    )
}

export default messages;