import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { store } from './store';
import save from './save.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { flush } from './slice'; // Assuming flush is imported from slice
import loading from './loading.gif'
const Edit = () => {
    const noteId = store.getState().user.detail.noteId;
    const Token = localStorage.getItem('token');
    const [data, setData] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            console.log(noteId);
            const res = await axios.get(`https://notes-app-phi-lac.vercel.app/note/get/${noteId}`, {
                headers: {
                    'Authorization': Token,
                }
            });
            console.log(res);
            if (res.data.alert) {
                console.log(res.data.alert);
                dispatch(flush());
                navigate('/expired');
            }
            if(res.data){
                console.log('res.data',res.data)
                setData({ title: res.data.title, content: res.data.content });
            }
            
        };
        getData();
    }, []);

    const handleEdit = async () => {
        const res = await axios.put(`https://notes-app-phi-lac.vercel.app/note/edit/${noteId}`, data, {
            headers: {
                'Authorization': Token,
            }
        });
        if (res.data.alert) {
            console.log(res.data.alert);
            dispatch(flush());
            navigate('/expired');
        }
        if (res.data.noy) {
            window.history.back();
        }
    };

    return (
        <>
            {/* <div className="border-4 border-[#7761a7] bg-teal-400 rounded-2xl w-[700px] h-[600px] flex flex-col mx-auto">
                <textarea
                    type="text"
                    name="title"
                    className="border-4 scroll border-[#7761a7] m-2 h-[50px] w-[675px] rounded-2xl p-2 resize-none text-2xl"
                    onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }}
                    value={data.title}
                ></textarea>
                <textarea
                    type="text"
                    name="content"
                    className="border-4 scroll border-[#7761a7] m-2 h-[530px] w-[675px] rounded-2xl p-2 resize-none text-2xl text-start"
                    onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }}
                    value={data.content}
                ></textarea>
                <img src={save} className="border-4 border-[#7761a7] fixed right-10 bottom-10 w-[50px] h-[50px] rounded-full cursor-pointer" onClick={handleEdit} />
            </div> */}
           
             <div className="bg-gradient-to-br from-[#7761a7] to-[#19b698] rounded-2xl flex flex-col justify-center items-center h-[600px]">
           {data==='' ?
              <img src={loading} width='200px' />   
                       :
          <>
            <input
                className="border-4 border-[#7761a7] m-2.5 h-[55px] w-[500px] rounded-2xl p-2.5 resize-none text-lg outline-none placeholder-gray-400 bg-transparent max-w-full"
                id="write-title"
                name="title"
                placeholder="Enter title..."
                value={data.title}
                onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }}
            />
            <textarea
                className="border-4 scroll border-[#7761a7] mb-[40px] h-[500px] w-[500px] rounded-2xl p-2.5 resize-none text-lg outline-none placeholder-gray-400 bg-transparent max-w-full"
                id="write-content"
                name="content"
                value={data.content}
                placeholder="Start writing..."
                onChange={(e) => { setData({ ...data, [e.target.name]: e.target.value }) }}
            ></textarea>
            <button
                className="border-4 border-[#7761a7] absolute bottom-10 right-10 w-12 h-12 rounded-full cursor-pointer bg-white hover:bg-gray-300 transition duration-300"
                id="write-save"
                onClick={handleEdit}
            >
                <img src={save} alt="Save" className="w-6 h-6 mx-auto" />
            </button>

            </>}
        </div>

</>
    );
}

export default Edit;
