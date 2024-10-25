import React from 'react'

const Navbar = () => {
    return (
        <>
            <nav className="bg-black text-white navBar fixed top-0 w-full z-10">
                <div className=" flex items-center justify-around py-4 px-4 h-14">
                <div className="logo">
                    <span className="text-green-500 text-xl font-bold">&lt;</span>
                    <span className="text-xl font-bold">Pass</span>
                    <span className="text-green-500 text-xl font-bold">OP/&gt;</span>
                </div>
                {/* <ul  className="">
                    <li className="flex gap-4 ">
                        <a className="hover:font-bold underline" href="/">Home</a>
                        <a className="hover:font-bold" href="/">About</a>
                        <a className="hover:font-bold" href="/">Contact</a>
                    </li>
                </ul > */}
                <button className="logo text-white flex gap-1 rounded-full border-2 bg-green-800 hover:bg-green-500 p-[5px] text-[12px] items-center">
                    <span className='font-bold'>Github</span>
                    <img className='invert w-5' src="/icons/github.svg" alt="github logo" />
                </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar