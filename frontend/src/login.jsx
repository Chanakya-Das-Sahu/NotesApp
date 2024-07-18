import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.png';
import cross from './cross.png';
import { useDispatch } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import { addUserEmail, addUserId } from './slice';

const Login = ({ setLogin }) => {
    const [data, setData] = useState({ email: '', password: '' });
    const [showAlert, setShowAlert] = useState(false);
    const [isEmail, setIsEmail] = useState('');
    const [isPassword, setIsPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const res = await axios.post('https://notes-app-phi-lac.vercel.app/user/login', data);

            if (res.data.msg === 'found') {
                localStorage.setItem('token', JSON.stringify(res.data.token));
                const userData = jwtDecode(res.data.token);
                dispatch(addUserEmail(userData.email));
                dispatch(addUserId(userData.id));
                setLogin(false);
            } else {
                setShowAlert(true);
            }
        } catch (err) {
            console.log(`login failed due to ${err}`);
        }
    };

    const handleCut = () => {
        setLogin(false);
    };

    const validateForm = async () => {
        let checked = true;
        if (!checkEmail(data.email.trim())) {
            checked = false;
            setIsEmail('Please Enter Valid Email');
        } else {
            setIsEmail('');
        }

        if (!data.email.trim()) {
            checked = false;
            setIsEmail('Please Enter Email');
        }

        if (!data.password.trim()) {
            checked = false;
            setIsPassword('Please Enter Password');
        } else {
            setIsPassword('');
        }

        if (checked) {
            handleLogin();
        }
    };

    const checkEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <div className="border-2 border-[#7761a7] rounded-lg flex flex-col p-5 gap-5 w-[300px] h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-400">
            <img src={cross} className="w-5 absolute top-[5%] right-[5%] cursor-pointer" onClick={handleCut} />
            <img src={logo} className="border-4 border-[#7761a7] w-24 rounded-full mx-auto" />
            {showAlert && (
                <div className="border border-red-500 rounded p-2.5 bg-white text-red-500 font-light">
                    Email or Password is wrong
                </div>
            )}
            {isEmail ? (
                <label className="text-red-500 font-light text-2xl">{isEmail}</label>
            ) : (
                <label className="text-[#7761a7] font-light text-2xl">Enter Your Email:</label>
            )}
            <input type="text" placeholder="email" name="email" className="h-6 rounded-lg border-2 border-[#7761a7] p-1" onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} />
            {isPassword ? (
                <label className="text-red-500 font-light text-2xl">{isPassword}</label>
            ) : (
                <label className="text-[#7761a7] font-light text-2xl">Enter Your Password</label>
            )}
            <input type="password" placeholder="password" name="password" className="h-6 rounded-lg border-2 border-[#7761a7] p-1" onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} />
            <button className="bg-[#7761a7] rounded-2xl h-12 text-white mt-5" onClick={validateForm}>Login</button>
        </div>
    );
};

export default Login;
