import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './dashboard.css';
import logo from './logo.png';
import google from './google.png';
import fb from './fb.png';
import Signup from './signup.jsx';
import Login from './login.jsx';
import { store } from './store';
import {useDispatch} from 'react-redux';
import {useCookies} from 'react-cookie';
import {flush} from './slice';
const Dash = () => {
    const [signup, setSignup] = useState(false);
    const [login, setLogin] = useState(false);
    const [id, setId] = useState('');
    const[cookie,setCookie,removeCookie] = useCookies();
    let Id ;
    // let Id = store.getState().user.user.userId;
    // console.log()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignup = () => {
        setSignup(true)
        setLogin(false)
        // console.log("signup")
    }

    const handleLogin = () => {
        setLogin(true)
        setSignup(false)
        // console.log(login)
    }

    const handleLogOut = () =>{
        removeCookie('jwt')
        dispatch(flush())
        // dispatch(addId(''))
        Id = store.getState().user.detal.userId;
        setId(Id)
    }

    useEffect(()=>{
        try{
        Id = store.getState().user.detail.userId;
        console.log(store.getState().user.detail)
           setId(Id)
        // console.log("ID",ID)
        // console.log(store.getState())
        }catch(err){
            setId('')
    }
    })

    useEffect(() => {
        setId(Id)
        console.log(id)
    },[login])

    return (
        <>
            <nav>
                <div><img src={logo} id='logo' /></div>
                <div>
                    {id ?
                        (<>
                            <div onClick={() => { navigate(`/home`) }}>My Notes</div>
                            <div onClick={handleLogOut}>Log Out</div>
                         </>
                        )
                        :
                        (
                            <div>
                                <div onClick={handleSignup} >Signup</div>
                                <div onClick={handleLogin}  >Login</div>

                                <div className='company'>
                                    <img src={google} width='20px'></img>
                                    Google
                                </div>
                                <div className='company'>
                                    <img src={fb} width='20px'></img>
                                    Facebook
                                </div>
                            </div>

                        )}
                  </div>  
            </nav>
            {signup && <Signup setSignup={setSignup} setLogin={setLogin} />}
            {login && <Login setLogin={setLogin} setId={setId} />}
            {/* {console.log("id",id)} */}
        </>
    )
}

export default Dash;