import { React, useEffect, useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import axios from 'axios';
const Edit = () => {
    const { id } = useParams();
    const [data, setData] = useState({ title: '', content: '' });
    const navigate = useNavigate();
    useEffect(() => {

        const getData = async () => {

            const res = await axios.get(`http://localhost:3000/note/get/${id}`)
            console.log(res.data.title);
            setData({ title: res.data.title, content: res.data.content })
            console.log(data)
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