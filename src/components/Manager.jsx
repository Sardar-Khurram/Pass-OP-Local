import React from 'react'
import { useRef, useState, useEffect } from 'react'
import Rocket from '../assets/icon7.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef();
    const passRef = useRef();
    const [form, setForm] = useState({ site: "", userName: "", password: "" });
    const [passwordsArray, setPasswordsArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordsArray(JSON.parse(passwords));
        }
    }, [])


    // Function Copy text
    const copyText = (text) => {
        toast(`Copied "${text}" to Clipboard`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    }

    // Function Handel Change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: [e.target.value] })
    };

    // Function to change icon on password field
    const showpassword = () => {
        if (ref.current.src.includes("icons/eye.png")) {
            ref.current.src = "icons/eyecross.png";
            passRef.current.type = 'text';
        }
        else {
            ref.current.src = "icons/eye.png";
            passRef.current.type = "password";
        }

    };

    // Function to save password
    const savePassword = () => {
        setPasswordsArray([...passwordsArray, { ...form, id: uuidv4() }]);
        localStorage.setItem("passwords", JSON.stringify([...passwordsArray, { ...form, id: uuidv4() }]));
        console.log([...passwordsArray, { ...form, id: uuidv4() }])
        setForm({ site: "", userName: "", password: "" })
        // toast("Password Saved!", {
        //     position: "top-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "dark",
        // });
    };

    // Function to Delete password
    const deletePassword = (id) => {
        console.log(`Deleting paassword with id ${id}`);
        if (confirm("Do you really want to delete this password?")) {
            setPasswordsArray(passwordsArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordsArray.filter(item => item.id !== id)));
        }
    };

    // Function to Edit password
    const editPassword = (id) => {
        console.log(`editing paassword with id ${id}`);
        setForm(passwordsArray.filter(i => i.id === id)[0]);
        setPasswordsArray(passwordsArray.filter(item => item.id !== id))
    };


    return (
        <>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {/* Same as */}
            <ToastContainer />

            <div className="mycontainer">

                {/* Pass Op introductory Heading */}
                <h1 className="text-4xl text-center">
                    <span className="text-green-500 font-bold">&lt;</span>
                    <span className="font-bold text-black">Pass</span>
                    <span className="text-green-500  font-bold">OP/&gt;</span>
                </h1>


                {/* Pass OP introductory paragraph */}
                <p className="text-green-900 text-lg text-center">Your own password manager</p>

                <div className="text-black flex flex-col items-center p-4 gap-2">


                    {/* First input feild to input name of website or item whose password you want to save */}
                    <input value={form.site} onChange={handleChange} name='site' placeholder='Enter Website URL' type="text" className="rounded-full border-2 border-green-500 w-full px-5 py-[2px] " />


                    {/* Feild where you write username and password */}
                    <div className="flex w-full gap-2">
                        <input value={form.userName} onChange={handleChange} name='userName' placeholder='Enter User Name' type="text" className="rounded-full border-2 border-green-500 w-full px-5 py-[2px] " />


                        {/* Password field */}
                        <div className="relative">
                            <span className="absolute right-3 top-[6px] cursor-pointer" onClick={showpassword}>
                                <img ref={ref} width={20} className='' src="icons/eye.png" alt="eye" />
                            </span>
                            <input ref={passRef} value={form.password} onChange={handleChange} name='password' placeholder='Password' type="password" className="rounded-full border-2 border-green-500 w-full px-5 py-[2px] " />
                        </div>
                    </div>


                    {/* Button to save passwords */}
                    <button onClick={savePassword} className="font-bold flex items-center gap-1 justify-center w-fit px-4 py-1 rounded-full border  border-green-900 bg-green-500 hover:bg-green-400 ">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}
                        >
                        </lord-icon>
                        Save Password</button>

                </div>


                {/* Portion of site where passwords will be shown */}
                

                    <h2 className="text-xl text-black font-bold py-2">
                        Your Passwords
                    </h2>
                    {/* This portion will display your information in tabular form */}

                    {passwordsArray.length === 0 && <div className='flex items-center justify-center'>
                        <img className='w-24 h-44' src={Rocket} alt="img" />
                        <p className="text-green-700 font-bold text-xl  ">Ooooops - You haven't saved any password yet</p>
                    </div>}
                    {passwordsArray.length != 0 &&
                        <table className="table-auto w-full rounded-lg">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>User Name</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-200'>
                                {passwordsArray.map((items, index) => {

                                    // Dynmaically getting passwords through input feilds
                                    return (
                                        <tr key={index}>

                                            {/* TD for site */}
                                            <td className='py-2 border border-white text-center '>
                                                <div className="flex items-center justify-center gap-4 ">
                                                    <span>
                                                        <a href={items.site} target='_blank'>{items.site}</a>
                                                    </span>
                                                    <span className="w-[20px] hover:w-[18px]" onClick={() => { copyText(items.site) }} >
                                                        <img className='' src="/icons/copy.svg" alt="" />
                                                    </span>
                                                </div>
                                            </td>

                                            {/* TD for User Name */}
                                            <td className='py-2 border border-white text-center '>
                                                <div className=" flex items-center justify-center gap-4 ">
                                                    <span> {items.userName}</span>
                                                    <span className="w-[20px] hover:w-[18px]" onClick={() => { copyText(items.userName) }} >
                                                        <img className='' src="/icons/copy.svg" alt="" />
                                                    </span>
                                                </div>
                                            </td>

                                            {/* TD for Password */}
                                            <td className='py-2 border border-white text-center '>
                                                <div className="flex items-center justify-center gap-2 ">
                                                    <span>{items.password}</span>
                                                    <span className="w-[20px] hover:w-[18px]" onClick={() => { copyText(items.password) }} >
                                                        <img className='' src="/icons/copy.svg" alt="" />
                                                    </span>
                                                </div>
                                            </td>

                                            {/* TD for Actions */}
                                            <td className='py-2 border border-white text-center '>
                                                <div className="flex items-center justify-center gap-2 md:gap-3">
                                                    <span className='w-[20px] hover:w-[18px]' onClick={() => { editPassword(items.id) }}>
                                                        <img  src="/icons/Edit.svg" alt="" />
                                                    </span>
                                                    <span className='w-[17px] hover:w-[16px]' onClick={() => { deletePassword(items.id) }}>
                                                        <img  src="/icons/Delete.svg" alt="" />
                                                    </span>
                                                </div>
                                            </td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>}
                
            </div>
        </>

    )
}

export default Manager