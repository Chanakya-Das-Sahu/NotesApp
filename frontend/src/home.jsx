import React from 'react';
import './home.css';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {TiDelete} from 'react-icons/ti'
const Home = () => {
  const [list, setList] = useState([]);
  const { id } = useParams();

  useEffect(() => {

    const getData = async()=>{
    const res = await axios.get(`http://localhost:3000/note/getAll/${id}`)
    // console.log(res.data.notes[0].content);
    // console.log(res.data.notes);
    setList(res.data.notes);
    // console.log(list);
    }

    getData();
  })
  
  const handleDelete = (e,id) =>{
   
    const fun = async () =>{
    await axios.delete(`http://localhost:3000/note/delete/${id}`)
   }
   
   fun();
  
   e.preventDefault();
  }

  return (
    <>

<div id='home-container'>
          {

            list.length == 0 ?
              (<h1 style={{ marginLeft: 'auto', marginRight: 'auto' }} >No Notes</h1>)
              :
              (list.map((ele) => (
                <Link to={`/edit/${ele._id}`} className='block'>
                  <p>{ele.content}</p>
                  <TiDelete onClick={(e)=>{handleDelete(e ,ele._id)}} />
                </Link>
              )))
              
              }
                       
        </div>

   <Link id="add" to={`/write/${id}`}>+</Link> 

    </>
  )
}

export default Home;


