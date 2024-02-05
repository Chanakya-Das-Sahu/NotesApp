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
import {addId} from './slice';
const Dash = () => {
    const [signup, setSignup] = useState(false);
    const [login, setLogin] = useState(false);
    const [id, setId] = useState('');
    const Id = store.getState().user.user.id;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignup = () => {
        setSignup(true)
        console.log("signup")
    }

    const handleLogin = () => {
        setLogin(true)
        console.log(login)
    }
    useEffect(() => {
        setId(Id)
    },[login,id])
    return (
        <>
            <nav>
                <div><img src={logo} id='logo' /></div>
                <div>
                    {id ?
                        (<>
                            <div onClick={() => { navigate(`/home/${id}`) }}>My Notes</div>
                            <div onClick={() => { dispatch(addId('')) }}>Log Out</div>
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
            {console.log(Id)}
            {/* {console.log("id",id)} */}
        </>
    )
}

export default Dash;