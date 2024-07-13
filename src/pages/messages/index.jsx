import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/Messages/Sidebar";
import { getCookies } from "@/utils";
import ChatWindow from "@/components/Messages/ChatWindow";
import { useRouter } from "next/router";

const messages = ({ initialChats }) => {
    const router = useRouter();
    const [chats, setChatsList] = useState(initialChats);

    useEffect(() => {
        if (chats?.length > 0 && !router.query.messageWith) {
            router.push(`/messages?messageWith=${chats[0].messagesWith}`, undefined, { shallow: true });
        }
    }, []);

    const handleSetChat = (chat) => {
        if (chat) {
            setChatsList((prev) => [chat, ...prev]);
        }
    }

    return (
        <div className="flex fixed bottom-0 left-0 w-full p-4" style={{ height: '85vh' }}>
            <div className="w-30">
                <Sidebar chats={chats} handleSetChat={handleSetChat} />
            </div>
            <div className="w-70" style={{ border: '1px solid green' }}>
                <ChatWindow />
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