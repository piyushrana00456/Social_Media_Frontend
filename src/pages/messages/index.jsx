import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/Messages/Sidebar";
import { getCookies } from "@/utils";
import ChatWindow from "@/components/Messages/ChatWindow";

const messages = ({initialChats}) => {
    const [chats, setChatsList] = useState(initialChats);

    return (
        <div className="flex fixed bottom-0 left-0 w-full p-4" style={{height: '85vh'}}>
            <div className="w-3/12">
                <Sidebar chats={chats}/>
            </div>
            <div className="w-3/4" style={{border: '1px solid green'}}>
                <ChatWindow/>
            </div>
        </div>
    )
}

export const  getServerSideProps = async (context) => {
    const cookies = context.req.cookies;
    const token = JSON.parse(cookies?.userData)?.token;

    try {

        const res = await axios.get('http://localhost:8000/api/chat/all', {
            headers:{
                Authorization:  token
            }
        });        
              return {
                props: {
                    initialChats: res?.data?.chats
                }
              }
        
    } catch (error) {
        console.log({error});
        return {
            props: {
                initialChats: []
            }
        }
    }
}

export default messages;