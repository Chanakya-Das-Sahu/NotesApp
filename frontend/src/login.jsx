import React, { useEffect, useState } from 'react';
import './login.css';
import axios from 'axios';
import logo from './logo.png';
import cross from './cross.png';
import {addUserId , addNoteId} from './slice'
import {useDispatch} from 'react-redux'
import {useCookies,Cookies} from 'react-cookie' 
import CookieHandler from './cookieHandler.js';
// import jwt_decode from 'jwt-decode'
const Login = ({ setLogin}) => {
    const [data, setData] = useState({ email: '', password: '' });
    const[showAlert , setShowAlert] = useState(false);
    const dispatch = useDispatch();
    const[cookies,setCookies] = useCookies();
    const Cookie = new Cookies();
    const {SetCookie} = CookieHandler()
    // const [exist, setExist] = useState(false);
    
    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:3000/user/login', data);
           if (res.data.msg=='found') {
             SetCookie(res.data.token)
            // setCookies("jwt",res.data.token,Date(Date.now()+(30*24*60*60*1000)))
            //  const data = decode("jwt")
            //  console.log("data",decode("jwt").id)
            // console.log(res)
            setLogin(false)
            } else {
                 setShowAlert(true)
                //  console.log(showAlert)
                // console.log("else")
            }
            // console.log(res.data) 
        } catch (err) {
            console.log(`login failed due to ${err}`);
        }
    }
  
    const handleCut = () => {
        setLogin(false)
    }

    return (
        <>
            <div id='container'>
                <img src={cross} id='cross' onClick={handleCut}></img>
                <img src={logo} id='login-logo'></img>
                {showAlert &&
                    <div id='red'>
                        Email or Password is wrong 
                    </div>
                }
                <lable className='lable'>Enter Your Email </lable>
                <input type="text" placeholder='email' name="email" onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} />
                <lable className='lable'>Enter Your Password</lable>
                <input type="text" placeholder='password' name="password" onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} />
                <button onClick={handleLogin}>Login</button>
            </div>
        </>

    )
}

export default Login;
