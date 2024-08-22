import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({ isOpen, closeSign, openLog, setLogged }) => {
    const modalRef = useRef(null);
    const handleBackgroundClick = (e) => {
        if (modalRef.current === e.target) {
            closeSign();
        }
    };

    const [creds, setCreds] = useState({ username: "", firstname: "", lastname: "", password: "" })
    const { username, firstname, lastname, password } = creds
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(creds)
        const res = await axios.put('http://localhost:5000/api/v1/user/signup', { username, firstname, lastname, password }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = res.data;
        if (json.success) {
            localStorage.setItem("token", json.token)
            closeSign()
            setLogged(true)
            navigate('/')
        }
        else {
            alert(json.msg)
        }
    }
    const onchange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }

    if (!isOpen) return null;

    return (
        <div ref={modalRef} className=" fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center z-50" onClick={handleBackgroundClick}>
            <div className="backdrop-blur-6xl bg-black border-[1px] border-green-700 p-6 rounded-lg shadow-lg shadow-black w-[40vw] min-h-[50vh] flex flex-col justify-center gap-6" onClick={(e) => e.stopPropagation()}>
                <div className='flex flex-col gap-1'>
                    <h2 className="text-3xl font-bold mb-4 justify-center flex">SignUp</h2>
                    <h3 className="flex justify-center text-gray-500">Please enter your Email and Password</h3>
                </div>
                <form className="space-y-10" onSubmit={submitHandler}>
                    <div className='flex gap-6 items-center justify-center'>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            className="bg-gray-800 block w-2/3 px-3 py-2 border border-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600 focus:border-[2px] sm:text-sm"
                            placeholder="First Name"
                            // value={creds.firstname}
                            onChange={onchange}
                        />
                    </div>
                    <div className='flex gap-6 items-center justify-center'>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            className="bg-gray-800 block w-2/3 px-3 py-2 border border-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600 focus:border-[2px] sm:text-sm"
                            placeholder="Last Name"
                            onChange={onchange}
                        // value={creds.lastname}
                        />
                    </div>
                    <div className='flex gap-6 items-center justify-center'>
                        <input
                            type="email"
                            id="email"
                            name="username"
                            className="bg-gray-800 block w-2/3 px-3 py-2 border border-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600 focus:border-[2px] sm:text-sm"
                            placeholder="Username"
                            onChange={onchange}
                        // value={creds.username}
                        />
                    </div>
                    <div className='flex gap-6 items-center justify-center'>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className=" bg-gray-800 block w-2/3 px-3 py-2 border border-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600 focus:border-[2px] sm:text-sm"
                            placeholder="Password"
                            onChange={onchange}
                        // value={creds.password}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button
                            type="submit"
                            className="flex justify-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Signup
                        </button>
                    </div>
                    <div className='flex justify-center'>
                        <div className='flex justify-center gap-2'>Already have an account <button className='text-green-600' onClick={() => {
                            closeSign()
                            openLog()
                        }}>login</button> </div>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default Signup;
