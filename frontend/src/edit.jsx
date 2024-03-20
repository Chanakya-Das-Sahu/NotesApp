import React from 'react';
import { useEffect, useState } from 'react';
// import {React , useState , useEffect } from 'react' : Not working in case 
import axios from 'axios';
import { store } from './store';
import './edit.css';
import save from './save.png';
const Edit = () => {
    const noteId = store.getState().user.detail.noteId;
    const [data, setData] = useState({ title: '', content: '' });
    useEffect(() => {
        const getData = async () => {
            console.log(noteId)
            const res = await axios.get(`/note/get/${noteId}`,{ withCredentials: true })
            console.log(res)
            setData({ title: res.data.title, content: res.data.content })
        }

        getData();
    }, []);

    const handleEdit = async () => {
        const res = await axios.put(`/note/edit/${noteId}`, data , {withCredentials:true})
        if (res) {
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

