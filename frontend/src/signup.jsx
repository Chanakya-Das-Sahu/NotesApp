import React, { useState } from 'react';
import './signup.css';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
const Signup = () => {
    const [data, setData] = useState({ name: '', password: '' });
    const navigate = useNavigate();
    const handleSignup = () => {
        try {
        const res = axios.post('http://localhost:3000/user/signup',data);
        if(res){
          navigate('/login');
        }
        } catch (err) {
            console.log(`signup failed due to ${err}`);
        }
    }

    return (
        <>
            <input type="text" placeholder='name' name="name" onChange={(e) => { setData({...data,[e.target.name]: e.target.value }) }} />
            <input type="text" placeholder='password' name="password" onChange={(e) => { setData({...data,[e.target.name]: e.target.value }) }} />
            <button onClick={handleSignup}>Signup</button>
        </>
    )
}

export default Signup;
