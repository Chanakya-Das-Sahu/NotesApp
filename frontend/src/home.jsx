import React from 'react';
import './home.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TiDelete } from 'react-icons/ti'
import deleteImg from './delete.png';
import editImg from './edit.png';
import {store} from './store.js';
import {addNoteId,flush} from './slice.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import plus from './plus.png';
const Home = () => {
  const [list, setList] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const userId = store.getState().user.detail.userId;
  const Token = localStorage.getItem('token')
  
 const getData = async () => {
      const res = await axios.get(`https://notesapp-roks.onrender.com/note/getAll/${userId}`,{
       headers:{
        'Authorization':Token ,
       }
      })
     console.log('res.data.alert',res.data.alert)
      if(res.data.alert){
       console.log('yes alert',res.data.alert)
       dispatch(flush())
       navigate('/expired')
      }else{
       console.log('no alert')
      }
      // console.log(res.data.notes)
      if(res.data.notes){
      setList(res.data.notes);
      }
    }

  useEffect(() => {
    console.log('hi',Token)
    getData();
  },[])
 
  const handleEdit = (id) =>{
    console.log("edit")
     dispatch(addNoteId(id))
     navigate('/edit')
  }

  const handleDelete = async (e, id) => {
    const res = await axios.delete(`https://notesapp-roks.onrender.com/note/delete/${id}`,{ headers:{
        'Authorization':Token ,
       }})
    getData()    
    e.preventDefault();
  }

  const handleWrite = () =>{
    navigate('/write')
  }

  return (
    <>

      <div id='home-container'>
        {

          list.length == 0 ?
            (<h1 style={{ marginLeft: 'auto', marginRight: 'auto' }} >No Notes</h1>)
            :
            (list.map((ele) => (
              <div className='block'>

                <div className='head'>

                  <div className='title'>
                    {ele.title}
                  </div>

                  <div className='controls'>
                    <img src={editImg} width='20px' onClick={()=>{handleEdit(ele._id)}}/>
                    <img src={deleteImg} width='20px' onClick={(e) => { handleDelete(e, ele._id) }} />
                  </div>

                </div>

                <div className='content'>
                  {ele.content}
                </div>

              </div>

            )))

        }

      </div>

      <img src={plus} id='add' onClick={handleWrite} />
    </>
  )
}

export default Home;


