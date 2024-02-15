import React from 'react';
import './write.css';
import { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import CookieHandler from './cookieHandler';
import save from './save.png'
const Write = () => {
    const {GetCookieData} = CookieHandler();
    const [data, setData] = useState(
        {
            userID: '',
            title: '',
            content: '',
        }
    )

    const id = GetCookieData().id;
    useEffect(() => {
        setData({...data,userID:id})
    }, [])
   
    const handleSave = () =>{
      axios.post(`https://notesapp-roks.onrender.com/note/create`,data);
      window.history.back();
    }

    return (
        <>
            <div id='write-container'>
                <textarea id='write-title' name='title' onChange={(e) => { setData({...data , [e.target.name]: e.target.value }) }}></textarea>
                <textarea id='write-content' name='content' onChange={(e) => { setData({...data , [e.target.name]: e.target.value }) }}></textarea>
                {/* <button onClick={handleSave} id='write-save'>Save</button> */}
                <img src={save} id='write-save' onClick={handleSave} />
            </div>
        </>
    )
}

export default Write;

// import { React, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {store} from './store';
// import './write.css';
// const Write = () => {
//     const id = store.getState().user.user.noteId ;
//     const [data, setData] = useState({ title: 'a', content: 'b' });
//     const navigate = useNavigate();
//     useEffect(() => {
//         // console.log("edit",id)
//         const getData = async () => {
            
//             const res = await axios.get(`https://notesapp-roks.onrender.com/note/get/${id}`)
//             console.log(id)
//             console.log(res)
//             // console.log("getdata",res)
//             // // console.log(res.data.title);
//             setData({ title: res.data.title, content: res.data.content })
//             // console.log(data)
//         }

//         getData();
    
//     }, []);
    
//     const handleEdit = async () =>{
//       const res = await axios.put(`https://notesapp-roks.onrender.com/note/edit/${id}`,data)
//        if(res){
//        window.history.back();
//     }
//     }

//     return (
//         <>
//         <div id='edit-container'>
//             <textarea type='text' name='write-title' id='title' onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} value={data.title}></textarea>
//             <textarea type='text' name='write-content' id='content' onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} value={data.content}></textarea>
//             <button onClick={handleEdit} id='save'>Edit</button>
//         </div>
//         </>
//     )
// }

// export default Write;