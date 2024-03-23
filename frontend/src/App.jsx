import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './home.jsx';
import Write from './write.jsx';
import Signup from './signup.jsx';
import Login from './login.jsx';
import Dash from './dashboard.jsx';
import Edit from './edit.jsx';
import Expired from './expired.jsx';
const App = () =>{
  return(
     <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dash/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/write' element={<Write/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/edit' element={<Edit/>}></Route>
      <Route path='/expired' element={<Expired/>}></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App ;