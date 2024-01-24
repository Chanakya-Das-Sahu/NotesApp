import React from 'react';
import './write.css';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const Write = () => {
    const [data, setData] = useState(
        {
            userID: '',
            title: '',
            content: '',
        }
    )

    const { id } = useParams();

    useEffect(() => {
        setData({...data,userID:id})
    }, [])
   
    const handleSave = () =>{
      axios.post(`http://localhost:3000/note/create`,data);
      window.history.back();
    }

    return (
        <>
            <div id='write-container'>
                <input id='title' name='title' onChange={(e) => { setData({...data , [e.target.name]: e.target.value }) }}></input>
                <input id='content' name='content' onChange={(e) => { setData({...data , [e.target.name]: e.target.value }) }}></input>
                <button onClick={handleSave}>Save</button>
            </div>
        </>
    )
}

export default Write;