import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.png';
import cross from './cross.png';

const Signup = ({ setSignup, setLogin }) => {
    const [data, setData] = useState({ email: '', password: '' });
    const [exist, setExist] = useState(false);
    const [isEmail, setIsEmail] = useState('');
    const [isPassword, setIsPassword] = useState('');

    const handleSignup = async () => {
        try {
            const res = await axios.post('https://notes-app-phi-lac.vercel.app/user/signup', data);

            if (res.data.msg === 'found') {
                setExist(true);
            }
            if (res.data.msg === 'created') {
                setSignup(false);
                setLogin(true);
            }

        } catch (err) {
            console.log(`signup failed due to ${err}`);
        }
    };

    const handleCut = () => {
        setSignup(false);
    };

    const validateForm = () => {
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
            handleSignup();
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
            {exist && (
                <div className="border border-red-500 rounded p-2.5 bg-white text-red-500 font-light">
                    This email already exists
                </div>
            )}
            {isEmail ? (
                <label className="text-red-500 font-light">{isEmail}</label>
            ) : (
                <label className="text-[#7761a7] font-light">Enter Your Email</label>
            )}
            <input
                type="text"
                placeholder="email"
                name="email"
                className="h-6 rounded-lg border-2 border-[#7761a7] p-1"
                onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }}
            />
            {isPassword ? (
                <label className="text-red-500 font-light">{isPassword}</label>
            ) : (
                <label className="text-[#7761a7] font-light">Enter Your Password</label>
            )}
            <input
                type="password"
                placeholder="password"
                name="password"
                className="h-6 rounded-lg border-2 border-[#7761a7] p-1"
                onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }}
            />
            <button className="bg-[#7761a7] rounded-2xl h-12 text-white mt-5" onClick={validateForm}>
                Signup
            </button>
        </div>
    );
};

export default Signup;
