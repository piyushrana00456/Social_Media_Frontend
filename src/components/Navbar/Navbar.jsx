import React from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";

const NavbarComponent = () => {
    return (
        <nav className="bg-white w-full p-4 shadow fixed top-0 left-0 z-100">
            <div className="flex">
                <div className="flex items-center w-1/4">
                    <GiHamburgerMenu size={'2rem'}/>
                </div>
                <div className="relative flex-1 w-1/2">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-500" />
                </div>
                <div className="flex items-center space-x-4 w-1/4 justify-end">
                    <FaBell className="text-gray-500" size={'2rem'}/>
                    <div className='pr-2'>
                        <img src="https://res.cloudinary.com/dnc3g9s6f/image/upload/v1718890814/zjvfntcm4ek9n1adub9w.webp" alt="User Avatar" className="h-10 w-10 rounded-full"/>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;