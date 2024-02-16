const express = require('express');
const userSchema = require('../models/User');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashedPass = await argon2.hash(password)
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
    check = await argon2.verify(user.password,password)
    token = jwt.sign({email:user.email,id:user._id},'your_secret_key',{expiresIn:'5s'})
    }
    // console.log(token)
    if(check){
        res.json({msg:'found',token})
        // console.log({msg:'found',user})
    }else{
        res.json({msg:'not found'})
    }
});


module.exports = router;


// const express = require('express');
// const userSchema = require('../models/User');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser')

// router.post('/signup', async (req, res) => {
//     const { email, password } = req.body;
//     const check = await userSchema.findOne({ email: email})
    
//     if (check) {
//      res.json({msg:'found'})
//     } else {

//         const newUser = await new userSchema({
//             email, password
//         });

//         try {
//             await newUser.save();
//             res.json({ msg:'created'})
//         } catch (err) {
//             console.log(`error due to ${err}`);
//         }
//     }
// });

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     const user = await userSchema.findOne({email,password}).select('-password');
//     let token;
//     if(user){
//     token = jwt.sign({email:user.email,id:user._id},'your_secret_key',{expiresIn:'5s'})
//         res.json({msg:'found',token})
//     }else{
//         res.json({msg:'not found'})
//     }
// });


// module.exports = router;
