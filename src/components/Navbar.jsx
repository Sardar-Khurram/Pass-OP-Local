import React from 'react';

const Navbar = () => {
    return (
        <>
            <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white navBar fixed top-0 w-full z-10 shadow-lg backdrop-blur">
                <div className="flex items-center justify-around py-4 px-4 h-14">
                <h1 className="text-xl text-center font-extrabold my-4 text-white hover:text-yellow-200 transition-all duration-300 ease-in-out">
                    <span>&lt;</span> Memory <span className="text-yellow-200">Locker/</span> <span>&gt;</span>
                </h1>
                    <button className="text-white flex items-center gap-2 rounded-full border-2 bg-gradient-to-r from-blue-600 to-purple-600 p-2 px-3 transition duration-300 transform hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600">
                        <span className="font-semibold">GitHub</span>
                        <img className="invert w-5" src="/icons/github.svg" alt="GitHub logo" />
                    </button>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
