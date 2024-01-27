import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { useState } from 'react';
import './dashboard.css';
import logo from './logo.png';
import google from './google.png';
import fb from './fb.png';
import Signup from './signup.jsx';
import Login from './login.jsx';
const Dash = () => {
    const [signup, setSignup] = useState(false);
    const [login, setLogin] = useState(false);
    const [id, setId] = useState();
    const navigate = useNavigate();
    const handleSignup = () => {
        setSignup(true)
        console.log("signup")
    }

    const handleLogin = () => {
        setLogin(true)
        console.log(login)
    }

    return (
        <>
            <nav>
                <div><img src={logo} id='logo' /></div>
                <div>
                    { id?
                    (
                    <div onClick={()=>{navigate(`/home/${id}`)}}>My Notes</div>
                    )
                    :
                    (
                    <div>
                       <div onClick={handleSignup} >Signup</div>
                        <div onClick={handleLogin}  >Login</div>
                    </div>
                    )
                   }
                    <div className='company'>
                        <img src={google} width='20px'></img>
                        Google
                    </div>
                    <div className='company'>
                        <img src={fb} width='20px'></img>
                        Facebook
                    </div>
                </div>
            </nav>
            <h1>{id}</h1>
            {signup && <Signup setSignup={setSignup} />}
            {login && <Login setLogin={setLogin} setId={setId} />}
            {console.log("id",id)}
        </>
    )
}

export default Dash;