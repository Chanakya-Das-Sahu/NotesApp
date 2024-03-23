import React from 'react';
import './write.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import save from './save.png'
import {store} from './store'
const Write = () => {
    const [data, setData] = useState(
        {
            userID: '',
            title: '',
            content: '',
        }
    )
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    const Token = localStorage.getItem('token')
    const userId = store.getState().user.detail.userId;
    useEffect(() => {
        setData({...data,userID:userId})
    }, [])
   
    const handleSave = async () =>{
     const res = await axios.post(`https://notesapp-roks.onrender.com/note/create`,data,{ headers:{
        'Authorization':Token ,
       }});
    //  console.log(res.data)
    if(res.data.alert){
        console.log(res.data.alert)
        dispatch(flush())
        navigate('/expired')
       }
    console.log(res)
      if(res.data.msg){
     window.history.back();
     }

    }

    return (
        <>
            <div id='write-container'>
                <textarea id='write-title' name='title' onChange={(e) => { setData({...data , [e.target.name]: e.target.value }) }}></textarea>
                <textarea id='write-content' name='content' onChange={(e) => { setData({...data , [e.target.name]: e.target.value }) }}></textarea>
                <img src={save} id='write-save' onClick={handleSave} />
            </div>
        </>
    )
}

export default Write;
