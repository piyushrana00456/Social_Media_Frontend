import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { io } from "socket.io-client";
import Sidebar from "@/components/Messages/Sidebar";
import { getCookies } from "@/utils";
import ChatWindow from "@/components/Messages/ChatWindow";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const messages = ({ initialChats }) => {
    const router = useRouter();
    const [chats, setChatsList] = useState(initialChats);
    const [messages, setMessages] = useState([]);
    const [massagesBanner, setMessagesBanner] = useState({ profilePic: '', username: '' });
    const socket = useRef(null);
    const user = getCookies("userData");

    useEffect(() => {
        if (!socket.current) {
            socket.current = io(BASE_URL);
        }
        else {
            socket.current.emit("userConnected", user.token);
        }

        if (chats?.length > 0 && !router.query.messageWith) {
            router.push(`/messages?messageWith=${chats[0].messagesWith}`, undefined, { shallow: true });
        }
    }, []);

    useEffect(() => {
        if (socket.current && router.query.messageWith) {

            socket.current.emit("loadMessages", {
                token: user?.token,
                messagesWith: router.query.messageWith
            });

            socket.current.on("messagesLoaded", ({ error, message, chats }) => {
                setMessages(chats?.messages);
                setMessagesBanner({
                    profilePic: chats?.messagesWith?.profilePic,
                    username: chats?.messagesWith?.username
                })
            })

            socket.current.on("noChatFound", async () => {
                const res = await axios.get(`${BASE_URL}/api/chat/${router.query.messageWith}`, {
                    headers: {
                        Authorization: user?.token
                    }
                })
                setMessagesBanner({username: res.data.username, profilePic: res.data.profilePic});
                setMessages([])
            })
        }
    }, [router.query.messageWith])

    useEffect(() => {
        if(socket.current){
            socket.current.on("messageSent", ({newMessage})=> {
                if(newMessage.receiver === router.query.messageWith){
                    setMessages((prev) => [...prev, newMessage])

                    setChatsList((prev) => {
                        const previousChat = prev.find(el => el.messagesWith === newMessage.receiver);
                        previousChat.lastMessage = newMessage.text;
                        previousChat.date = newMessage.date;
                        return [...prev];
                    })
                }
            });

            socket.current.on("newMessageReceived", async ({newMessage}) => {
                console.log({newMessage}, "*******************************************");
                if(newMessage.sender === router.query.messageWith){
                    setMessages((prev) => [...prev, newMessage]);
                    setChatsList((prev) => {
                        const prevChat = prev.find((el) => el.messagesWith === newMessage.sender);
                        prevChat.lastMessage = newMessage.text,
                        prevChat.date = newMessage.date;
                        return [...prev];
                    })
                }
                else {
                    const isPreviousMessage = chats.filter(el => el.messagesWith === newMessage.sender).length > 0;

                    if(isPreviousMessage){

                        setChatsList((prev) => {
                            const prevChat = prev.find((el) => el.messagesWith === newMessage.sender);
                        prevChat.lastMessage = newMessage.text,
                        prevChat.date = newMessage.date;
                        return [...prev];
                        })
                    }
                    else {
                        const res = await axios.get(`${BASE_URL}/api/chat/${router.query.messageWith}`, {
                            headers: {
                                Authorization: user?.token
                            }
                        });

                        const newChat = {
                            messagesWith: newMessage.sender,
                            username: res.data.username,
                            profilePic: res.data.profilePic,
                            lastMessage: newMessage.text,
                            date: newMessage.date,
                        } 

                        setChatsList((prev) => [newChat, ...prev]);
                    }
                }
            })
        }

        return () => {
            if(socket.current){
                socket.current.off("messageSent")
            }
        }
    },[])

    const handleSetChat = (chat) => {
        if (chat) {
            setChatsList((prev) => [chat, ...prev]);
        }
    }

    const handleSendMessage = (textToSend) => {
        if(socket.current){
            const payload = {
                token: user?.token,
                messageWith: router.query.messageWith,
                text: textToSend,
            }
            socket.current.emit("sendMessage", payload);
        }
    }

    return (
        <div className="flex fixed bottom-0 left-0 w-full p-4" style={{ height: '85vh' }}>
            <div className="w-30">
                <Sidebar
                    chats={chats}
                    handleSetChat={handleSetChat}
                />
            </div>
            <div className="w-70 pl-1">
                <ChatWindow
                    banner={massagesBanner}
                    messages={messages}
                    messagesWith={router.query.messageWith}
                    senderUsername={user?.username}
                    receiverUsername={massagesBanner?.username}
                    handleSendMessage={handleSendMessage}
                />
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const cookies = context.req.cookies;
    const token = JSON.parse(cookies?.userData)?.token;

    try {

        const res = await axios.get('http://localhost:8000/api/chat/all', {
            headers: {
                Authorization: token
            }
        });
        return {
            props: {
                initialChats: res?.data?.chats
            }
        }

    } catch (error) {
        console.log({ error });
        return {
            props: {
                initialChats: []
            }
        }
    }
}

export default messages;