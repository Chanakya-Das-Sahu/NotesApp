const express = require('express');
const userSchema = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    const check = await userSchema.findOne({ email: email })

    if (check) {
     res.json({msg:'found'})
     console.log("found");
    } else {

        const newUser = await new userSchema({
            email, password
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
    const rlt = await userSchema.findOne({ email, password });
    res.json(rlt)
});


module.exports = router;
