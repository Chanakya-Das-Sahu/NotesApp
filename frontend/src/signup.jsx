import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import logo from './logo.png';
import cross from './cross.png';
const Signup = ({ setSignup , setLogin}) => {
    const [data, setData] = useState({ email: '', password: '' });
    const [exist, setExist] = useState(false);
    const[isEmail,setIsEmail] = useState('')
    const[isPassword,setIsPassword] = useState('')
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

    const validateForm = () =>{
        let checked = true 
       if(!checkEmail(data.email.trim())){
        checked = false
       setIsEmail('Please Enter Valid Email ')
  }else{
    setIsEmail('')
  }

        if(!data.email.trim()){
            checked = false
           setIsEmail('Please Enter Email ')
      }
        
       if(!data.password.trim()){
          checked = false
          setIsPassword('Please Enter Password')
       }else{
        setIsPassword('')
       }

   


       if(checked){
         handleSignup();
       }
    }

    const checkEmail = (email) =>{
     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
     return regex.test(email)
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
                {isEmail ?
                <lable className='lable' style={{color:'red'}} >{isEmail}</lable> :
                <lable className='lable'>Enter Your Email </lable>
                 
                 }
                <input type="text" placeholder='email' name="email" onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} />
                {isPassword ?
                <lable className='lable' style={{color:'red'}} >{isPassword}</lable>:
                <lable className='lable'>Enter Your Password</lable> 
                 }
                <input type="text" placeholder='password' name="password" onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} />
                <button onClick={validateForm}>Signup</button>
            </div>
        </>

    )
}

export default Signup;
