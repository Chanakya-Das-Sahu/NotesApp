import React, { useEffect, useState } from 'react';
import './login.css';
import axios from 'axios';
import logo from './logo.png';
import cross from './cross.png';
import { useDispatch } from 'react-redux'
import { useCookies, Cookies } from 'react-cookie'
import { jwtDecode } from 'jwt-decode'
import { addUserEmail, addUserId } from './slice'
const Login = ({ setLogin }) => {
    const [data, setData] = useState({ email: '', password: '' });
    const [showAlert, setShowAlert] = useState(false);
    const[isEmail,setIsEmail] = useState('')
    const[isPassword,setIsPassword] = useState('')
    const dispatch = useDispatch();
    const [cookie, setCookie, removeCookie] = useCookies();
    const cookies = new Cookies();

    const handleLogin = async () => {
        try {
            
            const res = await axios.post('https://notesapp-roks.onrender.com/user/login', data);

            if (res.data.msg == 'found') {
                setCookie('jwt',res.data.token,{
                    secure: true ,
                    httpOnly: true ,
                    domain:'https://quiet-platypus-72ccf6.netlify.app'
                })
                const userData = jwtDecode(res.data.token)
             
                dispatch(addUserEmail(userData.email))
                console.log(userData)
                dispatch(addUserId(userData.id))
                setLogin(false)
            } else {
                setShowAlert(true)
             
            }
        } catch (err) {
            console.log(`login failed due to ${err}`);
        }
    }

    const handleCut = () => {
        setLogin(false)
    }

    const validateForm = async() =>{
          let checked = true ;
         if(!checkEmail(data.email.trim())){
         checked = false ;
          setIsEmail('Please Enter Valid Email');
        }else{
            setIsEmail('')
        }

        if(!data.email.trim()){ 
         checked = false ;
         setIsEmail('Please Enter Email ')
        }
        
        if(!data.password.trim()){
          checked = false ;
          setIsPassword('Please Enter Password');
        }else{
            setIsPassword('')
        }

       if(checked){
      handleLogin()
       }

      
       
    }

   const checkEmail = (email) =>{
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
      return regex.test(email)
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
                {isEmail ?
                <lable className='lable'  style={{color:'red'}} >{isEmail}</lable> :
                <lable className='lable'>Enter Your Email : </lable> 
                
                }
                <input type="text" placeholder='email' name="email" onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} />
                {isPassword ?
                <lable className='lable' style={{color:'red'}} >{isPassword}</lable> :
                <lable className='lable'>Enter Your Password</lable> 
                
                 }
                <input type="text" placeholder='password' name="password" onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} />
                <button onClick={validateForm}>Login</button>
            </div>
        </>

    )
}

export default Login;
