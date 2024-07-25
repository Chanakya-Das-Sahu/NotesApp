import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TiDelete } from 'react-icons/ti';
import deleteImg from './delete.png';
import editImg from './edit.png';
import { store } from './store.js';
import { addNoteId, flush } from './slice.js';
import { useDispatch } from 'react-redux';
import plus from './plus.png';
import loading from './loading.gif'
const Home = () => {
  const [list, setList] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[deleting,setDeleting] = useState(false)
  const userId = store.getState().user.detail.userId;
  const Token = localStorage.getItem('token');
  
  const getData = async () => {
    const res = await axios.get(`https://notes-app-phi-lac.vercel.app/note/getAll/${userId}`, {
      headers: {
        'Authorization': Token,
      }
    });
    if (res.data.alert) {
      dispatch(flush());
      navigate('/expired');
    } 
    console.log('res.data.notes:',res.data.notes)
    if (res.data.notes) {
      setList(res.data.notes);
      setDeleting(false)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = (id) => {
    dispatch(addNoteId(id));
    navigate('/edit');
  };

  const handleDelete = async (e, id) => {
    setDeleting(true)
    await axios.delete(`https://notes-app-phi-lac.vercel.app/note/delete/${id}`, {
      headers: {
        'Authorization': Token,
      }
    });
    getData();
    // e.preventDefault();
  };

  const handleWrite = () => {
    navigate('/write');
  };

  return (
    <div className="py-[50px] bg-gradient-to-br from-[#7761a7] to-[#19b698] flex flex-col items-center justify-center h-full">
             <div className="chanakya border-8 border-[#7761a7] mx-auto w-[740px] h-[600px] rounded-2xl flex flex-wrap p-5 gap-2.5 overflow-auto text-xl max-w-full mx-[20px]">
           {list=== '' ? 
          <div className="flex flex-col items-center justify-center h-full w-full">
            <img src={loading} className='mx-auto' width='300px' />
          </div>
         : 
        <>
          <div className="w-full h-[200px] flex flex-col justify-center items-center bg-white rounded-lg shadow-md mb-5 sm:w-[200px]" onClick={handleWrite} ><img src={plus} width="50px"/></div>

  
         {list.length>0 ?
          
          list.map((ele) => (
            <div key={ele._id} className=" w-full h-[200px] bg-white rounded-lg shadow-md mb-5 sm:w-[200px]">
              <div className="flex justify-between items-center p-3 border-b border-gray-300">
                <h2 className="text-xl font-bold w-[150px] h-[30px] overflow-auto scroll">{ele.title}</h2>
                <div className="flex gap-3">
                  <img src={editImg} width="20px" onClick={() => handleEdit(ele._id)} className="cursor-pointer" />
                  <img src={deleteImg} width="20px" onClick={(e) => handleDelete(e, ele._id)} className="cursor-pointer" />
                </div>
              </div>
              <div className="p-3 w-full h-[140px] overflow-auto scroll">
                <p>{ele.content}</p>
              </div>
            </div>
          ))
          :
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-white text-4xl mb-5">No Notes Yet</h1>
            <p className="text-white text-lg">Start writing your thoughts and ideas!</p>
          </div>


        }
    
      </>
        }
       
      </div>
       {deleting &&
      <div className='relative bottom-[700px] left-[10px] w-[700px] h-[700px] flex flex-col justify-center items-center'>
      <img src={loading} className='m-auto' width='300px' />
      </div>
}
    </div>
  );
}

export default Home;
