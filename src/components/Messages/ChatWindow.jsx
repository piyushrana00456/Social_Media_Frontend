import { useState } from "react";
import { FaPaperPlane } from 'react-icons/fa';

const ChatWindow = ({token, socket, selectedFriend}) => {
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if(socket.current){
            socket.current.emit("sendMessages", {token, messagesWith: selectedFriend, message})
        }
    }

    return (
        <div className="w-full h-full bg-white flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto">
                {/* <div className="mb-4">
                    <p className="text-gray-600 text-sm">UI Art Design</p>
                    <div className="p-4 bg-gray-100 rounded-md">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel ipsa commodi illum saepe numquam maxime asperiores voluptate sit, minima perspiciatis.</p>
                    </div>
                </div> */}
                {/* <div className="mb-4 text-right">
                    <p className="text-gray-600 text-sm">A</p>
                    <div className="inline-block p-4 bg-blue-100 rounded-md">
                        <p>I'm ok what about you?</p>
                    </div>
                </div> */}
                <div className="mb-4 text-right">
                    <p className="text-gray-600 text-sm">A</p>
                    <div className="inline-block p-4 bg-blue-100 rounded-md">
                        <p>I'm ok what about you?</p>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-gray-100 border-t border-gray-200 flex justify-between">
                <input
                    type="text"
                    className="w-11/12 p-2 border border-gray-300 rounded-md"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    onClick={handleSendMessage}
                >
                    <FaPaperPlane size="1.5rem" />
                </button>
            </div>
        </div>
    )
}


export default ChatWindow;