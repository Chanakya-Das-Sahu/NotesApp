import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { store } from './store';
import './edit.css';
import save from './save.png';
const Charu = () => {
    // const noteId = store.getState().user.detail.noteId;
    const userDetail = store.getState().user?.detail; // Using optional chaining to handle potential undefined values
const noteId = userDetail?.noteId; // Using optional chaining to handle potential undefined values

    const [data, setData] = useState({ title: 'a', content: 'b' });
    useEffect(() => {
        const getData = async () => {
            console.log(noteId)
            const res = await axios.get(`/note/get/${noteId}`,{ withCredentials: true })
            console.log(res)
            setData({ title: res.data.title, content: res.data.content })
        }

        getData();

    }, [])

    const handleEdit = async () => {
        const res = await axios.put(`/note/edit/${noteId}`, data , {withCredentials:true})
        if (res) {
            window.history.back();
        }
    }

    // return(
    //    <>
    //    </>
    // )

}

export default Charu;


// return (
//     <>
//         <div id='edit-container'>
//             <textarea type='text' name='title' id='title' onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} value={data.title}></textarea>
//             <textarea type='text' name='content' id='content' onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }} value={data.content}></textarea>
//             <img src={save} id='save' onClick={handleEdit} />
//         </div>
//         <h1>Hello World</h1>
//     </>
// )
