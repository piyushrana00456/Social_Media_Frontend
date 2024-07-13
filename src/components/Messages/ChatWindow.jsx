import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const ChatWindow = ({
    banner,
    messages,
    messagesWith,
    senderUsername,
    receiverUsername,
    handleSendMessage
}) => {
    const [text, setText] = useState("");
    return (
        <div className="w-full h-full bg-white flex flex-col">
            <div className="flex h-10 items-center pl-4 bg-gray-100 border-t border-gray-200">
                <div className="h-8 w-8 bg-red-500 rounded-full">
                    <img src={banner?.profilePic} />
                </div>
                <div className="font-bold text-xl pl-2">{banner?.username}</div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {
                    messages?.map((el) => {
                        return el.sender === messagesWith ? (
                            <div className="mb-4 text-left" key={el._id}>
                                <div className='max-w-45'>
                                    <p className="text-gray-600 text-sm pb-1 pl-1">{receiverUsername}</p>
                                    <div className="p-4 bg-gray-100 rounded-md">
                                        <p>{el?.text}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-4 flex justify-end" key={el._id}>
                                <div className='p-1 max-w-45'>
                                    <p className="text-gray-600 text-sm text-right pb-1 pr-1">{senderUsername}</p>
                                    <div className="inline-block p-4 bg-blue-100 rounded-md">
                                        <p>{el?.text}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="p-4 bg-gray-100 border-t border-gray-200 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-11/12 p-2 border border-gray-300 rounded-md"
                    value = {text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    onClick={() => {handleSendMessage(text); setText("")}}
                >
                    <FaPaperPlane size="1.5rem" />
                </button>
            </div>
        </div>
    )
}


export default ChatWindow;