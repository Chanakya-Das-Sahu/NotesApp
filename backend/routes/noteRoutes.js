const express = require('express');
const noteSchema = require('../models/Note');
const router = express.Router();
const mongoose = require('mongoose');
const cookie = require('cookie');
const auth = require('../middleware/Auth.js')
router.get('/getAll/:id',auth,async(req,res)=>{
      // const cookieHeader = req.cookies.jwt;
      // console.log(req.cookies.jwt)
      // const {jwt} = req.cookies ;
      // console.log(jwt);
      // console.log(1)
      // console.log(req.cookies.jwt)
      const {id} = req.params ;
      // console.log(cookieHeader)
      // console.log("2")
      // const charu = cookie.parse(cookieHeader)
      // console.log(charu)
      const notes = await noteSchema.find({userID:id});
      // console.log(notes)
     res.json({notes})
});

router.get('/get/:id',auth,async(req,res)=>{
  const{id} = req.params;
  const rlt = await noteSchema.findById(id);
  res.json(rlt);
  // console.log("yes")
  // console.log(id)
})

router.post('/create',auth,async(req,res)=>{
  const{userID , title, content} = req.body ;
   const newNote = new noteSchema({
     userID , title , content 
   })
   await newNote.save();
});

router.put('/edit/:id',auth,async(req,res)=>{
  const {id} = req.params;
  const {title,content} = req.body ;
  const rlt  = await noteSchema.findByIdAndUpdate(
    id,
    {$set:{title:title,content:content}},
  )
   res.json({noy:true})
})

router.delete('/delete/:id',auth,async(req,res)=>{
     const {id} = req.params ;
try{ 
     await noteSchema.findByIdAndDelete(id)
 }catch(err){
    console.log(`There is a problem with error ${err}`)
 }
    })

module.exports = router ;