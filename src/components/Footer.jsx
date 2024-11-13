import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="text-[10px] sm:text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white navBar fixed bottom-0 w-full z-10 shadow-lg">
                <div className="flex items-center justify-between py-4 px-4 h-6">
                <h1 className="text-center font-extrabold my-4 text-white hover:text-yellow-200 transition-all duration-300 ease-in-out">
                    <span>&lt;</span> Memory <span className="text-yellow-400">Locker/</span> <span>&gt;</span>
                </h1>
                    <span>&copy;copyright-All rights reserved</span>
                    <span>&lt;/Created by Sardar Khurram&gt;</span>
                </div>
            </footer>
        </>
    )
}

export default Footer