import React, { useState } from 'react';
import './login.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const [data, setData] = useState({ name: '', password: '' });
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {

           const res = await axios.post('http://localhost:3000/user/login',data)
           const id = res.data._id;
           if(res){
            navigate(`/home/${id}`)
           }

        } catch (err) {
            console.log(`login failed due to ${err}`);
        }
    }

    return (
        <>
            <input type="text" placeholder='name' name="name" onChange={(e) => { setData({...data,[e.target.name]: e.target.value }) }} />
            <input type="text" placeholder='password' name="password" onChange={(e) => { setData({...data,[e.target.name]: e.target.value }) }} />
            <button onClick={handleLogin}>Login</button>
        </>
    )
}

export default Login;