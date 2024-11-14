import React, { useRef, useState, useEffect } from 'react';
import Rocket from '../assets/icon7.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef();
    const passRef = useRef();
    const [form, setForm] = useState({ site: "", userName: "", password: "" });
    const [passwordsArray, setPasswordsArray] = useState([]);

    useEffect(() => {
        const passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordsArray(JSON.parse(passwords));
        }
    }, []);

    const copyText = (text) => {
        toast(`Copied "${text}" to Clipboard`, {
            position: "top-center",
            autoClose: 5000,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const showpassword = () => {
        if (ref.current.src.includes("icons/eye.png")) {
            ref.current.src = "icons/eyecross.png";
            passRef.current.type = 'text';
        } else {
            ref.current.src = "icons/eye.png";
            passRef.current.type = "password";
        }
    };

    const savePassword = () => {
        const updatedPasswords = [...passwordsArray, { ...form, id: uuidv4() }];
        setPasswordsArray(updatedPasswords);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        setForm({ site: "", userName: "", password: "" });
    };

    const deletePassword = (id) => {
        if (confirm("Do you really want to delete this password?")) {
            const updatedPasswords = passwordsArray.filter(item => item.id !== id);
            setPasswordsArray(updatedPasswords);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        }
    };

    const editPassword = (id) => {
        const item = passwordsArray.find(i => i.id === id);
        setForm(item);
        const updatedPasswords = passwordsArray.filter(item => item.id !== id);
        setPasswordsArray(updatedPasswords);
    };

    return (
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen flex flex-col justify-between text-white">
            <ToastContainer position="top-center" autoClose={5000} theme="dark" />
            <div className="mycontainer px-4 sm:px-8">

                <h1 className="text-5xl text-center font-extrabold my-4 text-white hover:text-yellow-200 transition-all duration-300 ease-in-out">
                    <span>&lt;</span> Memory <span className="text-yellow-200">Locker/</span> <span>&gt;</span>
                </h1>
                <p className="text-lg text-center mb-4">Your own password manager</p>

                <div className="text-black flex flex-col items-center p-4 gap-4 bg-white/20 rounded-xl shadow-lg">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        name='site'
                        placeholder='Enter Website URL'
                        type="text"
                        className="rounded-full border-2 border-gray-200 w-full px-5 py-2 text-gray-700 bg-white focus:border-purple-400"
                    />

                    <div className="flex w-full gap-4 flex-col sm:flex-row">
                        <input
                            value={form.userName}
                            onChange={handleChange}
                            name='userName'
                            placeholder='Enter User Name'
                            type="text"
                            className="rounded-full border-2 border-gray-200 w-full px-5 py-2 text-gray-700 bg-white focus:border-purple-400"
                        />
                        <div className="relative">
                            <span className="absolute right-3 top-3 cursor-pointer" onClick={showpassword}>
                                <img ref={ref} width={20} src="icons/eye.png" alt="eye" />
                            </span>
                            <input
                                ref={passRef}
                                value={form.password}
                                onChange={handleChange}
                                name='password'
                                placeholder='Password'
                                type="password"
                                className="rounded-full border-2 border-gray-200 w-full px-5 py-2 text-gray-700 bg-white focus:border-purple-400"
                            />
                        </div>
                    </div>

                    <button
                        onClick={savePassword}
                        className="hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 font-bold flex items-center gap-1 justify-center w-fit px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:bg-purple-700 transition-all duration-300"
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}
                            className="invert-0"
                        >
                        </lord-icon>
                        Save Password
                    </button>
                </div>

                <h2 className="text-2xl font-semibold py-4">Your Passwords</h2>

                {passwordsArray.length === 0 ? (
                    <div className='flex items-center justify-center text-white'>
                        <img className='w-24 h-44' src={Rocket} alt="No passwords saved" />
                        <p className="text-xl font-semibold">Ooooops - You haven't saved any password yet</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {passwordsArray.map((items, index) => (
                            <div key={index} className="border border-gray-400 p-4 rounded-lg bg-white/20 shadow-md flex justify-between items-center transition-all duration-300 hover:bg-purple-600">
                                <div className="flex flex-col gap-8">
                                    <div>
                                        <p className="font-bold">Site:</p>
                                        <a href={items.site} target='_blank' rel="noreferrer" className="text-blue-900 hover:text-blue-400">{items.site}</a>
                                    </div>
                                    <div>
                                        <p className="font-bold">User Name:</p>
                                        <p>{items.userName}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold">Password:</p>
                                        <p>{items.password}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <img className='w-6 cursor-pointer hover:scale-110' onClick={() => editPassword(items.id)} src="/icons/Edit.svg" alt="Edit" />
                                    <img className='w-5 cursor-pointer hover:scale-110' onClick={() => deletePassword(items.id)} src="/icons/Delete.svg" alt="Delete" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Manager;
