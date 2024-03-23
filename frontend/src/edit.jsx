import React from 'react';
import { useEffect, useState } from 'react';
// import {React , useState , useEffect } from 'react' : Not working in case 
import axios from 'axios';
import { store } from './store';
import './edit.css';
import save from './save.png';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
const Edit = () => {
    const noteId = store.getState().user.detail.noteId;
    const Token = localStorage.getItem('token')
    const [data, setData] = useState({ title: '', content: '' });
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        const getData = async () => {
            console.log(noteId)
            const res = await axios.get(`https://notesapp-roks.onrender.com/note/get/${noteId}`,{  headers:{
                'Authorization':Token ,
               } })
            console.log(res)
            if(res.data.alert){
                console.log(res.data.alert)
                dispatch(flush())
                navigate('/expired')
               }
            setData({ title: res.data.title, content: res.data.content })
        }
        getData();
    }, []);

    const handleEdit = async () => {
        const res = await axios.put(`https://notesapp-roks.onrender.com/note/edit/${noteId}`, data , { headers:{
        'Authorization':Token ,
       }})
       if(res.data.alert){
        console.log(res.data.alert)
        dispatch(flush())
        navigate('/expired')
       }
        if (res.data.noy) {
            window.history.back();
        }
    }

    return (
        <>
            <div id='edit-container'>
                <textarea type='text' name='title' id='title' onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} value={data.title}></textarea>
                <textarea type='text' name='content' id='content' onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} value={data.content}></textarea>
                {/* <button onClick={handleEdit} id='save'>Edit</button> */}
                <img src={save} id='save' onClick={handleEdit} />
            </div>
        </>
    )
    
}

export default Edit;

