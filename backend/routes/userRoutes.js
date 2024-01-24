const express = require('express');
const userSchema = require('../models/User');
const router = express.Router();

router.post('/signup',async(req,res)=>{
    const {name,password} = req.body;
    const newUser = await new userSchema({
        name , password
    });

    try{
    await newUser.save();
    res.json({noy:true})
    }catch(err){
      console.log(`error due to ${err}`);
    }
});

router.post('/login',async(req,res)=>{
    const {name,password} = req.body;
    const rlt = await userSchema.findOne({name,password});
    res.json(rlt)
});


module.exports = router ;
