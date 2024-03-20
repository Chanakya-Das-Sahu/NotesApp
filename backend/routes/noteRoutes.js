const express = require('express');
const noteSchema = require('../models/Note');
const router = express.Router();
const mongoose = require('mongoose');
const cookie = require('cookie');
const auth = require('../middleware/Auth.js')
router.get('/getAll/:id',auth,async(req,res)=>{
      const {id} = req.params ;
   
      const notes = await noteSchema.find({userID:id});

      res.json({notes})
});

router.get('/get/:id',auth,async(req,res)=>{
  const{id} = req.params;
  const rlt = await noteSchema.findById(id);
  res.json(rlt);
  
})

router.post('/create',auth,async(req,res)=>{
  const{userID , title, content} = req.body ;
   const newNote = new noteSchema({
     userID , title , content 
   })
   await newNote.save();
   res.json({msg:'created'})
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
     res.json({msg:'deleted'})
 }catch(err){
    console.log(`There is a problem with error ${err}`)
 }
    })

module.exports = router ;