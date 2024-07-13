const jwt = require('jsonwebtoken')
// const { jwtDecode } = require('jwt-decode')
const User = require('../models/User.js')
const auth = (req, res, next) => {
    const token = JSON.parse(req.headers.authorization);

    if (token) {
        let userDetail 
        try{
        userDetail = jwt.verify(token, 'your_secret_key')
       
        // console.log(userDetail)
        const id = userDetail.id
        const checked = User.find({ id })
        if (checked) {
            next()
        }
         }catch(err){
          res.json({alert:'expired'})
        }
    }
    // if(token.authorization){
    //     if(token.authorization.){

    //     }
    // }
    // console.log(req.cookies)
    // try {
    //     const userDetail = jwt.verify(token,'your_secret_key')
    //     const id = userDetail.id;
    //     const check = User.find({ id })
    //     if (check) {
    //         next();
    //     } else {
    //         console.log('unable')
    //     }
    // } catch (err) {
    //     console.log("charu", err)
    // }
}

module.exports = auth;