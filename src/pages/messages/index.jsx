import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Sidebar from "@/components/Messages/Sidebar";
import { getCookies } from "@/utils";
import ChatWindow from "@/components/Messages/ChatWindow";

const messages = () => {
    const [friendsList, setFriendsList] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [chats, setChats] = useState([]);
    const socket = useRef();
    const user = getCookies('userData');

    useEffect(() => {

        if (!socket.current) {
            socket.current = io(process.env.NEXT_PUBLIC_BASE_URL);
        }

        (async () => {
            try {
                await axios.get('http://localhost:8000/api/request/accepted', {
                    headers: {
                        Authorization: user?.token
                    }
                }).then((res) => {
                    const list = res?.data?.friendsList?.friendsList;
                    setFriendsList(list)
                    setSelectedFriend(list[0]?.user?._id);
                })
            } catch (error) {
                console.log('error during friend list', error.message);
            }
        })()
    }, []);

    useEffect(() => {
        if (socket.current) {
            socket.current.emit("loadMessages", {
                token: user.token,
                messagesWith: selectedFriend || null,
            })

            socket.current.on("noMessagesFound", () => {
                console.log("inside no message")
            })

            socket.current.on("messagesFound", ({ userChats }) => {
                console.log({ userChats });
            })
        }
    }, [])

    const handleSelectedFriend = (friend) => {
        console.log({ friend, selectedFriend });
        setSelectedFriend(friend?._id);
    }
    return (
        <div className="flex fixed bottom-0 left-0 w-full p-4" style={{ height: '85vh' }}>
            <div className="w-3/12">
                <Sidebar
                    friendsList={friendsList || []}
                    selectedFriend={selectedFriend}
                    handleSelectedFriend={handleSelectedFriend} />
            </div>
            <div className="w-3/4">
                <ChatWindow
                    token={user?.token}
                    socket={socket}
                    selectedFriend={selectedFriend}
                />
            </div>
        </div>
    )
}

export default messages;