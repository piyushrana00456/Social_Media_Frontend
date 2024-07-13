import React, { useRef, useState } from 'react';
import { getCookies } from '@/utils';
import axios from 'axios';
import { useRouter } from 'next/router';
import UserCard from '../common/userCard';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Sidebar = ({ chats, handleSetChat }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const debounceRef = useRef(null);
  const user = getCookies("userData");

  const handleRouting = (data, shallow) => {
    router.push(`/messages?messageWith=${data?.messagesWith}`, undefined, { shallow: shallow || false });
  }

  const handleChange = (e) => {
    const value = e.target.value

    setSearchValue(value);

    if (value.length === 0) {
      setSearchResult([])
    }

    if (value.length > 2) {

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        axios.get(`${BASE_URL}/api/search/friends/${value}`, {
          headers: {
            Authorization: user?.token,
          }
        }).then((res) => {
          setSearchResult(res.data.searchList);
        })
      }, 2500)

    }
  }

  const activeUser = (id) => {
    return router.query.messageWith === id
  }

  const handleSearchClick = (data) => {
    const isAlreadyInChat = chats?.some((el) => el.messagesWith === data.id);

    if (isAlreadyInChat) handleRouting({ messagesWith: data.id });
    else {
      const newMessage = {
        messagesWith: data?.id,
        username: data?.username,
        profilePic: data?.profilePic,
        lastMessage: "",
        date: Date.now()
      }
      handleSetChat(newMessage);
      setSearchResult([]);
      setSearchValue("");
      return handleRouting({ messagesWith: data?.id });
    }

  }

  return (
    <div className="bg-gray-100 p-4 h-full">
      <div className="mb-2 h-90 overflow-y-auto">
        <h2 className="text-xl font-bold">{searchResult?.length > 0 ? "Search" : "Friends"}</h2>
        <div className="mt-2">
          {
            searchResult?.length > 0 ? (

              searchResult.map(el =>
                <div>
                  <UserCard
                    handleClick={handleSearchClick}
                    // activeUser={activeUser}
                    data={el}
                    messagesWithId={el?.id}
                  />
                </div>
              )
            ) :
              (
                chats?.map((el) =>
                  <div key={el.username}>
                    <UserCard
                      handleClick={handleRouting}
                      activeUser={activeUser}
                      data={el}
                      messagesWithId={el?.messagesWith}
                    />
                  </div>
                )
              )
          }
        </div>
      </div>
      <div className='h-10 flex justify-center items-center' style={{ border: '1px solid gray' }}>
        <input
          className='pl-2 h-full w-full pl-1 text-xl'
          placeholder='Search Friends'
          value={searchValue}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Sidebar;
