import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.png';
import cross from './cross.png';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { addUserEmail, addUserId } from './slice';
import loadingImage from './loading.gif'
const Login = ({ setLogin }) => {
    const [data, setData] = useState({ email: '', password: '' });
    const [showAlert, setShowAlert] = useState(false);
    const [vemail, setVemail] = useState('');
    const [vpassword, setVpassword] = useState('');
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const handleLogin = async () => {
        setLoading(true)
        try {
            const res = await axios.post('https://notes-app-phi-lac.vercel.app/user/login', data);

            if (res) {
                setLoading(false)
            }

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

        // Email Validation :

        if (data.email == '') {
            setVemail('Please Enter Email : ')
        } else {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                setVemail('')
            } else {
                setVemail('Please Enter Valid Email : ')
            }
        }

        // Password Validation :

        if (data.password == '') {
            setVpassword('Please Enter Password : ')
        } else {
            setVpassword('')
        }
        //  setTimeout(()=>{
        //   console.log('data',data)
        //   console.log('vp',vemail,vpassword)
        //  },1000)
        if (!vemail && !vpassword) {
            handleLogin()
            console.log('data',data)
              console.log('vp',vemail,vpassword)
        }

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
            <label className='text-[red]'>{vemail}</label>
            <input type="text" placeholder="email" name="email" className="h-6 rounded-lg border-2 border-[#7761a7] p-1" onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} />
            <label className='text-[red]'>{vpassword}</label>
            <input type="password" placeholder="password" name="password" className="h-6 rounded-lg border-2 border-[#7761a7] p-1" onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} />
            {loading ?
                <img src={loadingImage} width='100px' className='mx-auto' />
                :
                <button className="bg-[#7761a7] rounded-2xl h-12 text-white mt-5" onClick={validateForm}>Login</button>
            }

        </div>
    );
};

export default Login;
