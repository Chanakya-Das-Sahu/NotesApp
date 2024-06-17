// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import logo from './logo.png';
// import google from './google.png';
// import fb from './fb.png';
// import Signup from './signup.jsx';
// import Login from './login.jsx';
// import { store } from './store';
// import { useDispatch } from 'react-redux';
// import { useCookies } from 'react-cookie';
// import { flush } from './slice';

// const Dash = () => {
//     const [signup, setSignup] = useState(false);
//     const [login, setLogin] = useState(false);
//     const [id, setId] = useState('');
//     const [cookie, setCookie, removeCookie] = useCookies();
//     let Id;
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleSignup = () => {
//         setSignup(true);
//         setLogin(false);
//     };

//     const handleLogin = () => {
//         setLogin(true);
//         setSignup(false);
//     };

//     const handleLogOut = () => {
//         removeCookie('jwt');
//         dispatch(flush());
//         Id = store.getState().user.detail.userId;
//         setId(Id);
//     };

//     useEffect(() => {
//         try {
//             Id = store.getState().user.detail.userId;
//             console.log(store.getState().user.detail);
//             setId(Id);
//         } catch (err) {
//             setId('');
//         }
//     });

//     useEffect(() => {
//         setId(Id);
//         console.log(id);
//     }, [login]);

//     return (
//         <>
//             <nav className="bg-[#7761a7] flex justify-between items-center p-5 shadow-lg">
//                 <div>
//                     <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
//                 </div>
//                 <div>
//                     {id ? (
//                         <div className="flex space-x-6">
//                             <div className="text-white text-xl cursor-pointer hover:text-gray-200" onClick={() => { navigate(`/home`); }}>
//                                 My Notes
//                             </div>
//                             <div className="text-white text-xl cursor-pointer hover:text-gray-200" onClick={handleLogOut}>
//                                 Log Out
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="flex space-x-6">
//                             <div className="text-white text-xl cursor-pointer hover:text-gray-200" onClick={handleSignup}>
//                                 Signup
//                             </div>
//                             <div className="text-white text-xl cursor-pointer hover:text-gray-200" onClick={handleLogin}>
//                                 Login
//                             </div>
//                             <div className="flex items-center bg-white text-gray-800 border border-teal-400 rounded-lg p-2 shadow-md hover:bg-gray-100 cursor-pointer">
//                                 <img src={google} alt="Google" className="w-6 h-6 mr-2" />
//                                 <span className="text-xl">Google</span>
//                             </div>
//                             <div className="flex items-center bg-white text-gray-800 border border-teal-400 rounded-lg p-2 shadow-md hover:bg-gray-100 cursor-pointer">
//                                 <img src={fb} alt="Facebook" className="w-6 h-6 mr-2" />
//                                 <span className="text-xl">Facebook</span>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </nav>
//             <div className="bg-[#79d0bd] min-h-screen flex flex-col items-center py-10">
//                 <h1 className="text-4xl text-[#7761a7] font-bold mb-5">Welcome to Your Personal Diary</h1>
//                 <p className="text-2xl text-[#7761a7] mb-10">Capture your thoughts and memories in a secure, digital space.</p>
//                 <div className="flex space-x-10 mb-10">
//                     <button onClick={handleSignup} className="bg-[#7761a7] text-white text-xl px-6 py-3 rounded-full shadow-md hover:bg-[#67529d]">Get Started</button>
//                     <button onClick={handleLogin} className="bg-[#7761a7] text-white text-xl px-6 py-3 rounded-full shadow-md hover:bg-[#67529d]">Login</button>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-4/5">
//                     <div className="bg-white p-5 rounded-lg shadow-lg">
//                         <h2 className="text-2xl text-[#7761a7] font-bold mb-3">Organize Your Notes</h2>
//                         <p className="text-[#7761a7]">Create, edit, and manage your notes with ease. Keep your thoughts organized and accessible.</p>
//                     </div>
//                     <div className="bg-white p-5 rounded-lg shadow-lg">
//                         <h2 className="text-2xl text-[#7761a7] font-bold mb-3">Stay Secure</h2>
//                         <p className="text-[#7761a7]">Your notes are stored securely, ensuring your privacy and data protection.</p>
//                     </div>
//                     <div className="bg-white p-5 rounded-lg shadow-lg">
//                         <h2 className="text-2xl text-[#7761a7] font-bold mb-3">Access Anywhere</h2>
//                         <p className="text-[#7761a7]">Access your notes from any device, anytime, anywhere. Your diary is always with you.</p>
//                     </div>
//                     <div className="bg-white p-5 rounded-lg shadow-lg">
//                         <h2 className="text-2xl text-[#7761a7] font-bold mb-3">Collaborate</h2>
//                         <p className="text-[#7761a7]">Share your notes with friends and collaborate on projects effortlessly.</p>
//                     </div>
//                 </div>
//             </div>
//             {signup && <Signup setSignup={setSignup} setLogin={setLogin} />}
//             {login && <Login setLogin={setLogin} />}
//         </>
//     );
// };

// export default Dash;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import google from './google.png';
import fb from './fb.png';
import Signup from './signup.jsx';
import Login from './login.jsx';
import { store } from './store';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { flush } from './slice';

const Dash = () => {
    const [signup, setSignup] = useState(false);
    const [login, setLogin] = useState(false);
    const [id, setId] = useState('');
    const [cookie, setCookie, removeCookie] = useCookies();
    let Id;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignup = () => {
        setSignup(true);
        setLogin(false);
    };

    const handleLogin = () => {
        setLogin(true);
        setSignup(false);
    };

    const handleLogOut = () => {
        removeCookie('jwt');
        dispatch(flush());
        Id = store.getState().user.detail.userId;
        setId(Id);
    };

    useEffect(() => {
        try {
            Id = store.getState().user.detail.userId;
            console.log(store.getState().user.detail);
            setId(Id);
        } catch (err) {
            setId('');
        }
    });

    useEffect(() => {
        setId(Id);
        console.log(id);
    }, [login]);

    return (
        <>
            <nav className="bg-gradient-to-r from-[#7761a7] to-[#5a437e] flex justify-between items-center p-5">
                <div>
                    <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
                </div>
                <div>
                    {id ? (
                        <div className="flex space-x-6 items-center">
                            <div className="text-white text-lg cursor-pointer hover:text-gray-200" onClick={() => { navigate(`/home`); }}>
                                My Notes
                            </div>
                            <div className="text-white text-lg cursor-pointer hover:text-gray-200" onClick={handleLogOut}>
                                Log Out
                            </div>
                        </div>
                    ) : (
                        <div className="flex space-x-6 items-center">
                            <div className="text-white text-lg cursor-pointer hover:text-gray-200" onClick={handleSignup}>
                                Signup
                            </div>
                            <div className="text-white text-lg cursor-pointer hover:text-gray-200" onClick={handleLogin}>
                                Login
                            </div>
                            <div className="flex items-center bg-white text-gray-800 border border-teal-400 rounded-lg p-2 shadow-md hover:bg-gray-100 cursor-pointer">
                                <img src={google} alt="Google" className="w-6 h-6 mr-2" />
                                <span className="text-lg">Google</span>
                            </div>
                            <div className="flex items-center bg-white text-gray-800 border border-teal-400 rounded-lg p-2 shadow-md hover:bg-gray-100 cursor-pointer">
                                <img src={fb} alt="Facebook" className="w-6 h-6 mr-2" />
                                <span className="text-lg">Facebook</span>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
            <div className="bg-gradient-to-r from-[#79d0bd] to-[#4faa8b] min-h-screen flex flex-col items-center py-10">
                <div className="w-full bg-center bg-cover h-80 flex items-center justify-center text-center text-white">
                    <div>
                        <h1 className="text-5xl font-bold mb-4">Welcome to Your Personal Diary</h1>
                        <p className="text-xl mb-8">Capture your thoughts and memories in a secure, digital space.</p>
                        <div className="flex space-x-8 justify-center items-center">
                            <button onClick={handleSignup} className="bg-[#7761a7] text-white text-lg px-6 py-3 rounded-full shadow-md hover:bg-[#67529d]">Get Started</button>
                            <button onClick={handleLogin} className="bg-[#7761a7] text-white text-lg px-6 py-3 rounded-full shadow-md hover:bg-[#67529d]">Login</button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-10">
                    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition duration-300 hover:shadow-lg">
                        <img src={logo} alt="Organize" className="w-16 h-16 mb-4" />
                        <h2 className="text-xl font-bold mb-2">Organize Your Notes</h2>
                        <p className="text-[#7761a7] text-center">Create, edit, and manage your notes with ease. Keep your thoughts organized and accessible.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition duration-300 hover:shadow-lg">
                        <img src={logo} alt="Secure" className="w-16 h-16 mb-4" />
                        <h2 className="text-xl font-bold mb-2">Stay Secure</h2>
                        <p className="text-[#7761a7] text-center">Your notes are stored securely, ensuring your privacy and data protection.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition duration-300 hover:shadow-lg">
                        <img src={logo} alt="Access" className="w-16 h-16 mb-4" />
                        <h2 className="text-xl font-bold mb-2">Access Anywhere</h2>
                        <p className="text-[#7761a7] text-center">Access your notes from any device, anytime, anywhere. Your diary is always with you.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition duration-300 hover:shadow-lg">
                        <img src={logo} alt="Collaborate" className="w-16 h-16 mb-4" />
                        <h2 className="text-xl font-bold mb-2">Ch</h2>
                       <p className="text-[#7761a7] text-center">Share your notes with friends and collaborate on projects effortlessly.</p>
                    </div>
                </div> 
                <p className="text-white text-[13px] text-center mt-[140px]">&copy; 2024 Chanakya Das Sahu</p>
            </div>
            {signup && <Signup setSignup={setSignup} setLogin={setLogin} />}
            {login && <Login setLogin={setLogin} />}
        </>
    );
};

export default Dash;
