// import React, { useState } from 'react';
// import './login.css';
// import {useNavigate} from 'react-router-dom';
// import axios from 'axios';
// const Login = () => {
//     const [data, setData] = useState({ email: '', password: '' });
//     const navigate = useNavigate();
//     const handleLogin = async () => {
//         try {

//            const res = await axios.post('http://localhost:3000/user/login',data)
//            const id = res.data._id;
//            if(res){
//             navigate(`/home/${id}`)
//            }

//         } catch (err) {
//             console.log(`login failed due to ${err}`);
//         }
//     }

//     return (
//         <>
//             <input type="text" placeholder='email' name="email" onChange={(e) => { setData({...data,[e.target.name]: e.target.value }) }} />
//             <input type="text" placeholder='password' name="password" onChange={(e) => { setData({...data,[e.target.name]: e.target.value }) }} />
//             <button onClick={handleLogin}>Login</button>
//         </>
//     )
// }

// export default Login;

import React, { useEffect, useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.png';
import cross from './cross.png';
const Login = ({ setLogin , setId  }) => {
    const [data, setData] = useState({ email: '', password: '' });
    const[showAlert , setShowAlert] = useState(false);
    const navigate = useNavigate();
    // const [exist, setExist] = useState(false);
    
    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:3000/user/login', data);
            if (res.data) {
               setId(res.data._id)
               setLogin(false)
            } else {
                 setShowAlert(true);
            }
         
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
