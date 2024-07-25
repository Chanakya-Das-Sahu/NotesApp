// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import save from './save.png';
// import { store } from './store';
// import { flush } from './slice';

// const Write = () => {
//     const [data, setData] = useState({
//         userID: '',
//         title: '',
//         content: '',
//     });
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const Token = localStorage.getItem('token');
//     const userId = store.getState().user.detail.userId;

//     useEffect(() => {
//         setData({ ...data, userID: userId });
//     }, [userId]);

//     const handleSave = async () => {
//         const res = await axios.post(`http://localhost:3000/note/create`, data, {
//             headers: {
//                 'Authorization': Token,
//             },
//         });

//         if (res.data.alert) {
//             dispatch(flush());
//             navigate('/expired');
//         }
        
//         if (res.data.msg) {
//             window.history.back();
//         }
//     };

//     return (
//         <div className="border-4 border-[#7761a7] bg-teal-400 rounded-2xl w-3/5 h-3/4 flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//             <textarea
//                 className="border-4 border-[#7761a7] m-2.5 h-12 w-auto rounded-2xl p-2.5 resize-none"
//                 id="write-title"
//                 name="title"
//                 onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }}
//             ></textarea>
//             <textarea
//                 className="border-4 border-[#7761a7] m-2.5 h-[530px] w-auto rounded-2xl p-2.5 resize-none"
//                 id="write-content"
//                 name="content"
//                 onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }}
//             ></textarea>
//             <img
//                 className="border-4 border-[#7761a7] fixed right-10 bottom-10 w-12 h-12 rounded-full cursor-pointer"
//                 src={save}
//                 id="write-save"
//                 onClick={handleSave}
//             />
//         </div>
//     );
// };

// export default Write;
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import save from './save.png';
import { store } from './store';
import { flush } from './slice';

const Write = () => {
    const [data, setData] = useState({
        userID: '',
        title: '',
        content: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Token = localStorage.getItem('token');
    const userId = store.getState().user.detail.userId;

    useEffect(() => {
        setData({ ...data, userID: userId });
    }, [userId]);

    const handleSave = async () => {
        const res = await axios.post(`http://localhost:3000/note/create`, data, {
            headers: {
                'Authorization': Token,
            },
        });

        if (res.data.alert) {
            dispatch(flush());
            navigate('/expired');
        }
        
        if (res.data.msg) {
            navigate(-1); // Go back to the previous page
        }
    };

    return (
        <div className="bg-gradient-to-br from-[#7761a7] to-[#19b698] rounded-2xl flex flex-col justify-center items-center">
            <input
                className="border-4 border-[#7761a7] m-2.5 h-[55px] w-[500px] rounded-2xl p-2.5 resize-none text-lg outline-none placeholder-gray-400 bg-transparent max-w-full"
                id="write-title"
                name="title"
                placeholder="Enter title..."
                onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }}
            />
            <textarea
                className="border-4 scroll border-[#7761a7] mb-[40px] h-[500px] w-[500px] rounded-2xl p-2.5 resize-none text-lg outline-none placeholder-gray-400 bg-transparent max-w-full"
                id="write-content"
                name="content"
                placeholder="Start writing..."
                onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }}
            ></textarea>
            <button
                className="border-4 border-[#7761a7] absolute bottom-10 right-10 w-12 h-12 rounded-full cursor-pointer bg-white hover:bg-gray-300 transition duration-300"
                id="write-save"
                onClick={handleSave}
            >
                <img src={save} alt="Save" className="w-6 h-6 mx-auto" />
            </button>
        </div>
    );
};

export default Write;
