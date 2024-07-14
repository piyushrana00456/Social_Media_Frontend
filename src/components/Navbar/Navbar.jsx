import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FaSearch, FaBell, FaTimes } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineAddReaction } from "react-icons/md";
import { CONSTANTS, HAMBURGER_OPTIONS, USER_PROFILE_OPTIONS } from './constants';
import { removeCookies } from '@/utils';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


const NavbarComponent = ({socket, user}) => {
    const router = useRouter();
    const DEFAULT_DROP_DOW_STATE = { isProfileDropDownOpen: false, isHamburgerMenuOpen: false, isSearchOpen: false };
    const [isDropdownOpen, setIsDropdownOpen] = useState(DEFAULT_DROP_DOW_STATE);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const debounceTimer = useRef(null);
    const searchRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => ({ ...prev, isProfileDropDownOpen: !prev.isProfileDropDownOpen }));
    };

    const toggleHamburger = () => {
        setIsDropdownOpen((prev) => ({ ...prev, isHamburgerMenuOpen: !prev.isHamburgerMenuOpen }));
    }

    const toggleSearch = (state) => {
        setIsDropdownOpen((prev) => ({ ...prev, isSearchOpen: state }));
    }

    const handleChange = (e) => {
        const value = e.target.value
        setSearchValue(value);
        if (value === "") {
            setSearchValue("");
            setSearchResult([])
            return;
        }

        if (value.length > 2) {

            if (debounceTimer.current) clearTimeout(debounceTimer.current);

            debounceTimer.current = setTimeout(() => {
                if (value !== "") {
                    axios.get(`${BASE_URL}/api/search/${value}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': user?.token
                        },
                    }).then(res => {
                        setSearchResult(res.data?.users || []);
                    })
                }
            }, 2500);
        }
    }

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            toggleSearch(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen.isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen.isSearchOpen]);

    const handleViewAllClick = (e) => {
        e.stopPropagation();
        toggleSearch(false);
        router.push(`/search?username=${searchValue}`)
    }

    const handleProfileClick = (username) => {
        setIsDropdownOpen(DEFAULT_DROP_DOW_STATE);
        router.push(`/profile/${username}`);
    }

    const handleOptionsClick = (value) => {
        if (value === CONSTANTS.logout) {
            if(socket){
                socket.emit("userDisconnected", user.token);
            }
            removeCookies(CONSTANTS.userData);
            removeCookies(CONSTANTS.token)
            router.push("/login");
        }
    }

    const handleSendFriendsRequest = async (userId) => {
       try {
      await axios.get(`${BASE_URL}/api/request/send/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": user.token,
            }
        }).then(res => {
            console.log(res.data);
        })
       } catch (error) {
          console.log('error during add friend request', error.message);
       }
    }

    const getLabel = (value) => {
        if(value  === CONSTANTS.profile && user?.username){
            return user?.username;
        }
        return false;
    }
    return (
        <nav className="bg-white w-full p-4 shadow fixed top-0 left-0 z-10">
            <div className="flex">
                <div className="flex items-center w-1/4">
                    <GiHamburgerMenu
                        size={'2rem'}
                        onClick={toggleHamburger}
                    />
                </div>
                <div className="relative flex-1 w-1/2" ref={searchRef}>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                        value={searchValue}
                        onChange={(e) => handleChange(e)}
                        onClick={() => toggleSearch(true)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-500" />
                    {isDropdownOpen?.isSearchOpen && (
                        <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg z-10">
                            <ul>
                                {
                                    searchResult?.length > 0 ? searchResult?.map(({ profilePic, username, userId }) => (
                                        <li key={username} className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex between"
                                            onClick={() => handleProfileClick(username)}
                                        >
                                            <div className='flex w-3/4 p-1'>
                                            <img
                                                src={profilePic}
                                                alt="User Avatar"
                                                className="h-8 w-8 rounded-full cursor-pointer"
                                            />
                                            <span className='pl-4 font-bold'>{username}</span>
                                            </div>
                                            <div className='w-1/4 flex justify-center'>
                                                <button 
                                                    type="button" 
                                                    className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                                                    onClick = {() => handleSendFriendsRequest(userId)}
                                                >
                                                    <MdOutlineAddReaction size={'2rem'}/>
                                                </button>
                                            </div>
                                        </li>
                                    )) :
                                        (
                                            <li className='px-4 py-4 hover:bg-gray-200 cursor-pointer text-center font-semibold text-xl'>
                                                No User Found
                                            </li>
                                        )
                                }
                            </ul>
                            <div className="border-t">
                                <button
                                    className="w-full px-4 py-2 text-blue-500 hover:bg-gray-200 focus:outline-none"
                                    onClick={handleViewAllClick}
                                >
                                    View All Search Results
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex items-center space-x-4 w-1/4 justify-end">
                    <FaBell className="text-gray-500" size={'2rem'} />
                    <div className="relative">
                        <img
                            src={user?.profilePic || "https://res.cloudinary.com/dnc3g9s6f/image/upload/v1718890814/zjvfntcm4ek9n1adub9w.webp"}
                            alt="User Avatar"
                            className="h-8 w-8 rounded-full cursor-pointer"
                            onClick={toggleDropdown}
                        />
                        {isDropdownOpen?.isProfileDropDownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                {
                                    USER_PROFILE_OPTIONS?.map(({ value, label }) => (
                                        <div
                                            key={value}
                                            className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                                            onClick={() => handleOptionsClick(value)}
                                        >
                                            {getLabel(value) || label}
                                        </div>
                                    ))
                                }
                            </div>
                        )}
                    </div>
                </div>
                {isDropdownOpen?.isHamburgerMenuOpen && (
                    <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-40">
                        <div className="p-4">
                            <div className="p-4 flex justify-between items-center border-b">
                                <h2 className="text-2xl font-bold">Menu</h2>
                                <FaTimes
                                    size='2rem'
                                    className="text-gray-700 cursor-pointer"
                                    onClick={toggleHamburger}
                                />
                            </div>
                            <ul className="mt-4">
                                {
                                    HAMBURGER_OPTIONS?.map(({ value, label, path }) => (
                                        <li key={value} className="border-b py-2" onClick={() => { router.push(path); toggleHamburger() }}>
                                            <div className="text-gray-700 hover:bg-gray-100 block px-4 py-2 rounded">{label}</div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavbarComponent;