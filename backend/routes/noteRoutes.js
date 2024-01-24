const express = require('express');
const noteSchema = require('../models/Note');
const router = express.Router();

router.get('/getAll/:id',async(req,res)=>{
      const {id} = req.params ;
     const notes = await noteSchema.find({userID:id});
     res.json({notes})
});

router.get('/get/:id',async(req,res)=>{
  const{id} = req.params;
  const rlt = await noteSchema.findById(id);
  res.json(rlt);
})

router.post('/create',async(req,res)=>{
  const{userID , title, content} = req.body ;
   const newNote = new noteSchema({
     userID , title , content 
   })
   await newNote.save();
});

router.put('/edit/:id',async(req,res)=>{
  const {id} = req.params;
  const {title,content} = req.body ;
  const rlt  = await noteSchema.findByIdAndUpdate(
    id,
    {$set:{title:title,content:content}},
  )
   res.json({noy:true})
})

module.exports = router ;