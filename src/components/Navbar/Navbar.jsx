import React, {useRef, useState} from 'react';
import { FaSearch, FaBell, FaTimes } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";
import { HAMBURGER_OPTIONS, USER_PROFILE_OPTIONS } from './constants';

const NavbarComponent = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState({isProfileDropDownOpen: false, isHamburgerMenuOpen: false});
    const [searchValue, setSearchValue] = useState('');
    const debounceTimer = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => ({...prev, isProfileDropDownOpen : !prev.isProfileDropDownOpen}));
    };

    const toggleHamburger = () => {
        setIsDropdownOpen((prev) => ({...prev, isHamburgerMenuOpen: !prev.isHamburgerMenuOpen}));
    }

    const handleChange = (e) => {
        const value = e.target.value
        setSearchValue(value);
        console.log({searchValue});
        if(value === ""){
            setSearchValue("");
            return;
        }
        
        if(debounceTimer.current) clearTimeout(debounceTimer.current);

        debounceTimer.current = setTimeout(() => {
           if(value !== ""){
                fetch(`http://localhost:8000/api/search/${value}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }).then(res => res.json()).then((res) => {

                })
           }
        }, 5000)
    }

    return (
        <nav className="bg-white w-full p-4 shadow fixed top-0 left-0 z-100">
            <div className="flex">
                <div className="flex items-center w-1/4">
                    <GiHamburgerMenu 
                        size={'2rem'} 
                        onClick={toggleHamburger}
                    />
                </div>
                <div className="relative flex-1 w-1/2">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                        value={searchValue}
                        onChange={(e) => handleChange(e)}
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-500" />
                </div>
                <div className="flex items-center space-x-4 w-1/4 justify-end">
                    <FaBell className="text-gray-500" size={'2rem'}/>
                    <div className="relative">
                        <img
                            src="https://res.cloudinary.com/dnc3g9s6f/image/upload/v1718890814/zjvfntcm4ek9n1adub9w.webp"
                            alt="User Avatar"
                            className="h-8 w-8 rounded-full cursor-pointer"
                            onClick={toggleDropdown}
                        />
                        {isDropdownOpen?.isProfileDropDownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                {
                                    USER_PROFILE_OPTIONS?.map(({value, label}) => (
                                        <div key={value} className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
                                            {label}
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
                                HAMBURGER_OPTIONS?.map(({value, label}) => (
                                    <li key={value} className="border-b py-2">
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