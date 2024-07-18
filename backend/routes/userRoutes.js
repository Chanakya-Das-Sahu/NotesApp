const express = require('express');
const userSchema = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
require('dotenv').config()

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body)
    const hashedPass = bcrypt.hashSync(password,10)
    const check = await userSchema.findOne({ email: email})
    
    if (check) {
     res.json({msg:'found'})
    } else {

        const newUser = await new userSchema({
            email, password:hashedPass
        });

        try {
            await newUser.save();
            res.json({ msg:'created'})
        } catch (err) {
            console.log(`error due to ${err}`);
        }
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userSchema.findOne({email});
    let check , token;

    if(user){
    check = await bcrypt.compare(password,user.password)
    
    }
    if(check){
        token = jwt.sign({email:user.email,id:user._id},process.env.JWT_KEY,{expiresIn:'20000s'})
        res.json({msg:'found',token})
    }else{
        res.json({msg:'not found'})
    }
});


module.exports = router;
