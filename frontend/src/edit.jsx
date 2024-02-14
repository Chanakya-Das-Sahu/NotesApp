import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {store} from './store';
const Edit = () => {
    const id = store.getState().user.user.noteId ;
    const [data, setData] = useState({ title: 'a', content: 'b' });
    const navigate = useNavigate();
    useEffect(() => {
        // console.log("edit",id)
        const getData = async () => {
            
            const res = await axios.get(`http://localhost:3000/note/get/${id}`)
            console.log(id)
            console.log(res)
            // console.log("getdata",res)
            // // console.log(res.data.title);
            setData({ title: res.data.title, content: res.data.content })
            // console.log(data)
        }

        getData();
    
    }, []);
    
    const handleEdit = async () =>{
      const res = await axios.put(`http://localhost:3000/note/edit/${id}`,data)
       if(res){
       window.history.back();
    }
    }

    return (
        <>
            <input type='text' name='title' onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} value={data.title}></input>
            <input type='text' name='content' onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} value={data.content}></input>
            <button onClick={handleEdit}>Edit</button>
        </>
    )
}

export default Edit;