const jwt = require('jsonwebtoken')
// const { jwtDecode } = require('jwt-decode')
const User = require('../models/User.js')
const auth = (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        const userDetail = jwt.verify(token,'your_secret_key')
        const id = userDetail.id;
        const check = User.find({ id })
        if (check) {
            next();
        } else {
            console.log('unable')
        }
    } catch (err) {
        console.log("charu", err)
    }
}

module.exports = auth;