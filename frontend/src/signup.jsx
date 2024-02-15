import React, { useState } from 'react';
import './signup.css';
// import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import logo from './logo.png';
import cross from './cross.png';
const Signup = ({ setSignup , setLogin}) => {
    const [data, setData] = useState({ email: '', password: '' });
    const [exist, setExist] = useState(false);
    const handleSignup = async () => {
        try {
            const res = await axios.post('https://notesapp-roks.onrender.com/user/signup', data);

            if (res.data.msg == 'found') {
                setExist(true)
            } 
            if(res.data.msg == 'created'){
                setSignup(false)
                setLogin(true)
            }

        } catch (err) {
            console.log(`signup failed due to ${err}`);
        }
    }

    const handleCut = () => {
        setSignup(false)
    }

    return (
        <>
            <div id='container'>
                <img src={cross} id='cross' onClick={handleCut}></img>
                <img src={logo} id='signup-logo'></img>
                {exist &&
                    <div id='red'>
                        This email already exists
                    </div>
                }
                <lable className='lable'>Enter Your Email </lable>
                <input type="text" placeholder='email' name="email" onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} />
                <lable className='lable'>Enter Your Password</lable>
                <input type="text" placeholder='password' name="password" onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} />
                <button onClick={handleSignup}>Signup</button>
            </div>
        </>

    )
}

export default Signup;
