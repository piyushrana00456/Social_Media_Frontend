
const UserCard = ({ handleClick, activeUser, data, messagesWithId }) => {
    return (
        <div
            className={`flex items-center p-2 rounded-md mb-2 shadow-sm cursor-pointer ${activeUser && activeUser(messagesWithId) ? "bg-slate-400" : "bg-white"}`}
            style={{ height: '65px' }}
            onClick={() => handleClick && handleClick(data, true)}
        >
            <div className="h-8 w-8 bg-red-500 rounded-full">
                <img src={data?.profilePic} />
            </div>
            <div className="ml-7">
                <p className="font-semibold">{data?.username}</p>
                <p className="text-gray-500 text-sm">
                    {data?.lastMessage?.length > 10 ? `${data?.lastMessage?.substring(0, 10)}...` : data?.lastMessage}
                </p>
            </div>
        </div>
    )
}

export default UserCard;