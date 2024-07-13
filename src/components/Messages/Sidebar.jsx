import React, { useRef, useState } from 'react';
import { getCookies } from '@/utils';
import axios from 'axios';
import { useRouter } from 'next/router';
import UserCard from '../common/userCard';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Sidebar = ({chats}) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const debounceRef = useRef(null);
  const user = getCookies("userData");
  
  const handleClick = (id) => {
    router.push(`/messages?messageWith=${id}`, undefined, { shallow: true});
  }

  const handleChange = (e) => {
    const value = e.target.value

    setSearchValue(value);

    if(value.length > 2){

      if(debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        axios.get(`${BASE_URL}/api/search/friends/${value}`, {
          headers: {
            Authorization: user?.token,
          }
        }).then((res) => {
          console.log(res.data, "res");
        })
      }, 2500)

    }
  }

  const activeUser = (id) => {
    return router.query.messageWith === id
  }

  return (
    <div className="bg-gray-100 p-4 h-full">
      <div className="mb-2 h-90 overflow-y-auto">
        <h2 className="text-xl font-bold">Friends</h2>
        <div className="mt-2">
          {
            chats?.map((el) => 
              <div key={el.name}>
                <UserCard
                handleClick={handleClick}
                activeUser={activeUser}
                data={el} 
              />
              </div>
            )
          }
        </div>
      </div>
      <div className='h-10 flex justify-center items-center' style={{border: '1px solid gray'}}>
        <input 
          className='pl-2 h-full w-full pl-1 text-xl'
          placeholder='Search Friends'
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Sidebar;
