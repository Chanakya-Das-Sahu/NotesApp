const express = require('express');
const userSchema = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashedPass = await bcrypt.hash(password,10)
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
    let check ;
    if(user){
    check = await bcrypt.compare(password,user.password)
    }
    const token = jwt.sign({email:user.email,id:user._id},'your_secret_key',{expiresIn:'5s'})
    // console.log(token)
    if(check){
        res.json({msg:'found',token})
        // console.log({msg:'found',user})
    }else{
        res.json({msg:'not found'})
    }
});


module.exports = router;
