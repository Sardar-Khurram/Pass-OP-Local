import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="bg-black text-white navBar text-[12px] fixed bottom-0 w-full">
                <div className="flex items-center justify-between py-4 px-4 h-6">
                    <div className="logo">
                        <span className="text-green-500 font-bold">&lt;</span>
                        <span className=" font-bold">Pass</span>
                        <span className="text-green-500 font-bold">OP/&gt;</span>
                    </div>
                    <span>&copy;copyright-All rights reserved</span>
                    <span>&lt;/Created by Sardar Khurram&gt;</span>
                </div>
            </footer>
        </>
    )
}

export default Footer