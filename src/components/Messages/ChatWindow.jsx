const ChatWindow = () => {
    return (
        <div className="w-full h-full bg-white flex flex-col">
            <div className="flex h-10 items-center pl-4 bg-gray-100 border-t border-gray-200">
            <div className="h-8 w-8 bg-red-500 rounded-full">
                <img src={""} />
            </div>
                <div className="font-bold text-xl pl-2">image</div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="mb-4">
                    <p className="text-gray-600 text-sm">UI Art Design</p>
                    <div className="p-4 bg-gray-100 rounded-md">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel ipsa commodi illum saepe numquam maxime asperiores voluptate sit, minima perspiciatis.</p>
                    </div>
                </div>
                <div className="mb-4 text-right">
                    <p className="text-gray-600 text-sm">A</p>
                    <div className="inline-block p-4 bg-blue-100 rounded-md">
                        <p>I'm ok what about you?</p>
                    </div>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600 text-sm">UI Art Design</p>
                    <div className="p-4 bg-gray-100 rounded-md">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing. ?</p>
                    </div>
                </div>
                <div className="mb-4 text-right">
                    <p className="text-gray-600 text-sm">A</p>
                    <div className="inline-block p-4 bg-blue-100 rounded-md">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing. ?</p>
                    </div>
                </div>
                <div className="mb-4">
                    <p className="text-gray-600 text-sm">UI Art Design</p>
                    <div className="p-4 bg-gray-100 rounded-md">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, in.</p>
                    </div>
                </div>
                <div className="mb-4 text-right">
                    <p className="text-gray-600 text-sm">A</p>
                    <div className="inline-block p-4 bg-blue-100 rounded-md">
                        <audio controls className="w-full">
                            <source src="path/to/audio/file.mp3" type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-gray-100 border-t border-gray-200">
                <input type="text" placeholder="Type your message..." className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
        </div>
    )
}


export default ChatWindow;