// this is expired.jsx 2 for testing purpose only
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo.png';
import cross from './cross.png';
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
// import { useCookies, Cookies } from 'react-cookie'
import { jwtDecode } from 'jwt-decode'
import { addUserEmail, addUserId } from './slice'
const Expired = ({ setLogin }) => {
    const [data, setData] = useState({ email: '', password: '' });
    const [showAlert, setShowAlert] = useState(false);
    const [isEmail, setIsEmail] = useState('')
    const [isPassword, setIsPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [cookie, setCookie, removeCookie] = useCookies();
    // const cookies = new Cookies();

    const handleLogin = async () => {
        try {

            const res = await axios.post('https://notes-app-phi-lac.vercel.app/user/login', data);

            if (res.data.msg == 'found') {
             
               
                localStorage.setItem('token',JSON.stringify(res.data.token))

                // console.log(Data.exp)

                const userData = jwtDecode(res.data.token)
      
                dispatch(addUserEmail(userData.email))
                console.log(userData)
                dispatch(addUserId(userData.id))
                // setLogin(false)
                navigate('/')
            } else {
                setShowAlert(true)

            }
        } catch (err) {
            console.log(`login failed due to ${err}`);
        }
    }

    

    const validateForm = async () => {
        let checked = true;
        if (!checkEmail(data.email.trim())) {
            checked = false;
            setIsEmail('Please Enter Valid Email');
        } else {
            setIsEmail('')
        }

        if (!data.email.trim()) {
            checked = false;
            setIsEmail('Please Enter Email ')
        }

        if (!data.password.trim()) {
            checked = false;
            setIsPassword('Please Enter Password');
        } else {
            setIsPassword('')
        }

        if (checked) {
            handleLogin()
        }



    }

    const checkEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email)
    }

    return (
        <>
            <div id='container' className='m-auto border w-[500px] h-[500px]'>
                <h1 style={{color:'#e14d4d',border:'2px solid #e14d4d',borderRadius:'5px',padding:'5px'}}>Your Session Has Been Expired !</h1>
                <img src={logo} id='login-logo' className='m-auto'></img>
               
                <div className='inputs gap-[10px] flex flex-col mx-[100px]'>
                     {showAlert &&
                    <div id='red'>
                        Email or Password is wrong
                    </div>
                }
                {isEmail ?
                    <lable className='lable' style={{ color: 'red' }} >{isEmail}</lable> :
                    <lable className='lable'>Enter Your Email : </lable>

                }
                      <input type="text" className='charu' placeholder='email' name="email" onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} />
                {isPassword ?
                    <lable className='lable' style={{ color: 'red' }} >{isPassword}</lable> :
                    <lable className='lable'>Enter Your Password</lable>

                }
                <input type="text" className='charu' placeholder='password' name="password" onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} />
                <button onClick={validateForm}>Login</button>
                </div>
              
            </div>
        </>

    )
}

export default Expired;
