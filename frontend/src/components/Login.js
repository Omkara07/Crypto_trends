import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ isOpen, closeLog, openSign, setLogged }) => {
    const modalRef = useRef(null);
    const handleBackgroundClick = (e) => {
        if (modalRef.current === e.target) {
            closeLog();
        }
    };

    const [creds, setCreds] = useState({ username: "", password: "" })
    const { username, password } = creds
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/api/v1/user/signin',
                { username, password },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            )
            const json = res.data;
            localStorage.setItem("token", json.token)
            closeLog()
            setLogged(true)
            navigate('/')
        }
        catch (err) {
            alert(err.response.data.msg)
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
                    <h2 className="text-3xl font-bold mb-4 justify-center flex">Login</h2>
                    <h3 className="flex justify-center text-gray-500">Please enter your Email and Password</h3>
                </div>
                <form className="space-y-10" onSubmit={submitHandler}>
                    <div className='flex gap-6 items-center justify-center'>
                        <input
                            type="email"
                            id="username"
                            name="username"
                            className="bg-gray-800 block w-2/3 px-3 py-2 border border-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-green-600 focus:border-green-600 focus:border-[2px] sm:text-sm"
                            placeholder="Username"
                            onChange={onchange}
                            value={username}
                            required
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
                            value={password}
                            required
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button
                            type="submit"
                            className="flex justify-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Login
                        </button>
                    </div>
                    <div className='flex justify-center'>
                        <div className='flex justify-center gap-2'>Don't have an account <button className='text-green-600' onClick={() => {
                            closeLog()
                            openSign()
                        }
                        }>Create one</button> </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
