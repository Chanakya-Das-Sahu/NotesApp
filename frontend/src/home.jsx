import React from 'react';
import './home.css';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { TiDelete } from 'react-icons/ti'
import deleteImg from './delete.png';
import editImg from './edit.png';
const Home = () => {
  const [list, setList] = useState([]);
  const { id } = useParams();

  useEffect(() => {

    const getData = async () => {
      const res = await axios.get(`http://localhost:3000/note/getAll/${id}`)
      // console.log(res.data.notes[0].content);
      // console.log(res.data.notes);
      setList(res.data.notes);
      // console.log(list);
    }

    getData();
  })

  const handleDelete = (e, id) => {

    const fun = async () => {
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
              <div className='block'>

                <div className='head'>

                  <div className='title'>
                    {ele.title}
                  </div>

                  <div className='controls'>
                    <Link to={`/edit/${ele._id}`}><img src={editImg} width='20px'/></Link>
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

      <Link id="add" to={`/write/${id}`}>+</Link>

    </>
  )
}

export default Home;


